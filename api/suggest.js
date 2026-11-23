export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'GEMINI_API_KEY is not configured' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const {
      lang = 'de',
      gender = 'all',
      age = 30,
      relation = 'friend',
      occasion = 'birthday',
      hobbies = [],
      minBudget = 20,
      maxBudget = 45,
      prompt = ''
    } = body;

    const safeAge = Math.max(1, Math.min(110, Number(age) || 30));
    const safeMin = Math.max(5, Math.min(500, Number(minBudget) || 15));
    const safeMax = Math.max(safeMin + 5, Math.min(600, Number(maxBudget) || 50));
    const safePrompt = String(prompt || '').slice(0, 220).trim();
    const isMinor = safeAge < 18;

    const targetLangName =
      lang === 'ru' ? 'Russisch' :
      lang === 'en' ? 'Englisch' : 'Deutsch';

    const systemInstruction = `
Du bist ein kreativer, praxisnaher Geschenkberater für den deutschen Markt (Amazon.de).
Antworte AUSSCHLIESSLICH mit einem gültigen JSON-Array aus genau 5 originellen Geschenkideen (ohne Markdown-Codeblöcke).
Jedes Objekt im Array MUSS exakt diese Felder haben:
{
  "emoji": "1 passendes Emoji",
  "title": "Prägnanter Geschenktitel auf ${targetLangName} (max. 55 Zeichen)",
  "reason": "Kurze, überzeugende Begründung auf ${targetLangName} (1 Satz, max. 115 Zeichen)",
  "query": "Konkreter deutscher Suchbegriff für Amazon.de (2-4 Wörter, OHNE 'Bestseller', OHNE Preise)"
}

Strenge Regeln:
1. 'title' und 'reason' müssen in natürlichem ${targetLangName} geschrieben sein.
2. 'query' MUSS IMMER ein präziser deutscher Produkt-Suchbegriff für Amazon.de sein (keine Bücher-Fallen, kein Wort 'Bestseller', keine allgemeinen Wörter wie nur 'Geschenk').
3. Preisrahmen beachten: Wähle Produktarten, die auf Amazon.de realistisch zwischen ${safeMin} EUR und ${safeMax} EUR kosten (schreibe KEINE Preise in 'title' oder 'reason'!).
4. ${isMinor
  ? 'JUGENDSCHUTZ AKTIV: Die Person ist unter 18 Jahre alt! Absolut KEIN Alkohol, keine Messer, keine Erotik, keine Tabak-/Vape-Artikel, kein Glücksspiel, keine gefährlichen Werkzeuge.'
  : 'Wähle alltagstaugliche, gut bewertete und kreative Produktideen.'}
5. Alle 5 Vorschläge müssen deutlich unterschiedlich sein.
`.trim();

    const userPrompt = `
Geschenkprofil:
- Geschlecht: ${gender}
- Alter: ${safeAge} Jahre
- Beziehung: ${relation}
- Anlass: ${occasion}
- Hobbys/Interessen: ${Array.isArray(hobbies) && hobbies.length ? hobbies.slice(0, 8).join(', ') : 'offen'}
- Budget-Korridor: ca. ${safeMin} bis ${safeMax} EUR
- Zusatzwunsch des Nutzers: ${safePrompt || 'keiner'}
`.trim();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.85,
            responseMimeType: 'application/json'
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', response.status, errText);
      return res.status(502).json({ error: 'Upstream AI error' });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '[]';

    let parsed = [];
    try {
      parsed = JSON.parse(rawText);
    } catch {
      const match = rawText.match(/\[[\s\S]*\]/);
      parsed = match ? JSON.parse(match[0]) : [];
    }

    const bannedMinor = /(alkohol|whisky|wein|bier|gin|vodka|likör|messer|zigarre|vape|erotik)/i;

    const cleanItems = (Array.isArray(parsed) ? parsed : [])
      .slice(0, 6)
      .map((item, idx) => {
        const cleanQuery = String(item.query || item.title || '')
          .replace(/bestseller/gi, '')
          .replace(/\d+\s?(€|eur|euro)/gi, '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 65);
        return {
          id: `ai_${Date.now()}_${idx}`,
          emoji: String(item.emoji || '✨').slice(0, 4),
          title: String(item.title || 'Geschenkidee').replace(/\d+\s?(€|eur|euro)/gi, '').trim().slice(0, 75),
          reason: String(item.reason || '').replace(/\d+\s?(€|eur|euro)/gi, '').trim().slice(0, 145),
          query: cleanQuery,
          isAi: true
        };
      })
      .filter((item) => item.query.length > 2)
      .filter((item) => !(isMinor && bannedMinor.test(`${item.title} ${item.query} ${item.reason}`)))
      .slice(0, 5);

    return res.status(200).json({ items: cleanItems });
  } catch (error) {
    console.error('Suggest handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

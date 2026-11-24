let cachedGroqModels = null;
let cachedGroqModelsAt = 0;

async function getGroqModels(groqKey) {
  if (cachedGroqModels && Date.now() - cachedGroqModelsAt < 30 * 60 * 1000) {
    return cachedGroqModels;
  }

  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { 'Authorization': `Bearer ${groqKey}` },
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Groq models list error:', res.status, errText.slice(0, 200));
      return [];
    }

    const json = await res.json();
    const list = Array.isArray(json?.data) ? json.data : [];

    const excluded = /(whisper|tts|guard|shield|safeguard|embed|rerank|orpheus|playai|moderation|compound|canopylabs|prompt-guard|audio|speech|transcribe|image)/i;

    const candidates = list
      .filter((m) => m && typeof m.id === 'string' && m.active !== false && !excluded.test(m.id))
      .map((m) => m.id);

    const scoreModel = (id) => {
      const s = id.toLowerCase();
      if (s.includes('llama-4-maverick')) return 100;
      if (s.includes('llama-4-scout')) return 95;
      if (s.includes('llama-4')) return 90;
      if (s.includes('gpt-oss-120b')) return 88;
      if (s.includes('llama-3.3-70b')) return 85;
      if (s.includes('kimi-k2')) return 82;
      if (s.includes('gpt-oss-20b')) return 80;
      if (s.includes('qwen3-32b') || s.includes('qwen-3')) return 78;
      if (s.includes('70b')) return 75;
      if (s.includes('llama-3.1-8b-instant')) return 70;
      if (s.includes('llama')) return 65;
      if (s.includes('qwen')) return 60;
      if (s.includes('gemma')) return 55;
      return 40;
    };

    candidates.sort((a, b) => scoreModel(b) - scoreModel(a));
    console.log('Groq available chat models:', candidates.slice(0, 6).join(', '));

    if (candidates.length > 0) {
      cachedGroqModels = candidates.slice(0, 5);
      cachedGroqModelsAt = Date.now();
    }
    return candidates.slice(0, 5);
  } catch (err) {
    console.error('Groq models fetch error:', err?.name || err?.message || err);
    return [];
  }
}

function parseGiftItems(rawText, isMinor) {
  if (!rawText) return [];

  const cleanedText = String(rawText)
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed = null;
  try {
    parsed = JSON.parse(cleanedText);
  } catch {
    const arrMatch = cleanedText.match(/\[[\s\S]*\]/);
    if (arrMatch) {
      try {
        parsed = JSON.parse(arrMatch[0]);
      } catch {
        parsed = null;
      }
    }
    if (!parsed) {
      const objMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (objMatch) {
        try {
          parsed = JSON.parse(objMatch[0]);
        } catch {
          parsed = [];
        }
      }
    }
  }

  const rawList = Array.isArray(parsed)
    ? parsed
    : (parsed && typeof parsed === 'object'
        ? (Object.values(parsed).find((v) => Array.isArray(v)) || [])
        : []);

  const bannedMinor = /(alkohol|whisky|wein|bier|gin|vodka|likör|messer|zigarre|vape|erotik)/i;

  return rawList
    .slice(0, 6)
    .map((item, idx) => {
      const cleanQuery = String(item.query || item.title || '')
        .replace(/bestseller/gi, '')
        .replace(/\d+\s?(€|eur|euro)/gi, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 65);
      const safeEmoji = Array.from(String(item.emoji || '✨').trim()).slice(0, 4).join('') || '✨';
      return {
        id: `ai_${Date.now()}_${idx}`,
        emoji: safeEmoji,
        title: String(item.title || 'Geschenkidee').replace(/\d+\s?(€|eur|euro)/gi, '').trim().slice(0, 75),
        reason: String(item.reason || '').replace(/\d+\s?(€|eur|euro)/gi, '').trim().slice(0, 145),
        query: cleanQuery,
        isAi: true
      };
    })
    .filter((item) => item.query.length > 2)
    .filter((item) => !(isMinor && bannedMinor.test(`${item.title} ${item.query} ${item.reason}`)))
    .slice(0, 5);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const groqKey = (process.env.GROQ_API_KEY || '').trim();
  const geminiKey = (process.env.GEMINI_API_KEY || '').trim();

  if (!groqKey && !geminiKey) {
    return res.status(503).json({ error: 'No AI API key configured' });
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
Antworte AUSSCHLIESSLICH mit einem gültigen JSON-Objekt im Format {"items": [...]} mit genau 5 originellen Geschenkideen (kein Markdown, kein Text außerhalb des JSON).
Jedes Objekt im Array "items" MUSS exakt diese Felder haben:
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
5. Alle 5 Vorschläge müssen deutlich unterschiedlich sein und direkt zum Zusatzwunsch passen.
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

    // 1. Основной движок: Groq с автовыбором доступной модели
    if (groqKey) {
      const groqModels = await getGroqModels(groqKey);
      const startedAt = Date.now();

      for (const model of groqModels.slice(0, 3)) {
        if (Date.now() - startedAt > 12000) break;

        try {
          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${groqKey}`
            },
            body: JSON.stringify({
              model,
              temperature: 0.8,
              messages: [
                { role: 'system', content: systemInstruction },
                { role: 'user', content: userPrompt }
              ]
            }),
            signal: AbortSignal.timeout(9000)
          });

          if (!groqRes.ok) {
            const errText = await groqRes.text();
            console.error(`Groq API error (${model}):`, groqRes.status, errText.slice(0, 250));
            continue;
          }

          const groqData = await groqRes.json();
          const rawText = String(groqData?.choices?.[0]?.message?.content || '').trim();
          const items = parseGiftItems(rawText, isMinor);

          if (items.length > 0) {
            return res.status(200).json({ items, provider: `groq:${model}` });
          }

          console.error(`Groq empty parse (${model}):`, rawText.slice(0, 250));
        } catch (err) {
          console.error(`Groq fetch error (${model}):`, err?.name || err?.message || err);
        }
      }
    }

    // 2. Резерв: Gemini (1 попытка)
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(geminiKey)}`,
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
            }),
            signal: AbortSignal.timeout(10000)
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const parts = geminiData?.candidates?.[0]?.content?.parts || [];
          const textParts = parts
            .filter((p) => !p.thought && typeof p.text === 'string')
            .map((p) => p.text);
          const rawText = String(textParts.length ? textParts.join('\n') : (parts[parts.length - 1]?.text || '')).trim();
          const items = parseGiftItems(rawText, isMinor);

          if (items.length > 0) {
            return res.status(200).json({ items, provider: 'gemini' });
          }
        } else {
          const errText = await geminiRes.text();
          console.error('Gemini fallback error:', geminiRes.status, errText.slice(0, 250));
        }
      } catch (err) {
        console.error('Gemini fallback fetch error:', err?.name || err?.message || err);
      }
    }

    return res.status(502).json({ error: 'Upstream AI error' });
  } catch (error) {
    console.error('Suggest handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

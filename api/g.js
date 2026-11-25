function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugToTitle(slug) {
  return String(slug || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function decodePayload(d) {
  if (!d) return null;
  try {
    const b64 = String(d).replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(b64, 'base64').toString('utf8');
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : null;
  } catch {
    return null;
  }
}

const SUPPORTED_LANGS = ['de', 'en', 'ru', 'tr', 'ar', 'pl', 'uk', 'ro', 'it'];

const TEXTS = {
  de: {
    subtitle: 'Persönliche Ideen in Sekunden',
    badge: 'Empfohlene Geschenkidee',
    defaultReason: 'Passende Geschenkidee mit guten Bewertungen auf Amazon.de entdecken.',
    amazonBtn: 'Auf Amazon.de ansehen *',
    moreBtn: 'Eigene Geschenkidee finden',
    shareBtn: 'Idee teilen',
    copied: 'Link kopiert!',
    disclaimer: '* Affiliate-Link: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen. Für dich entstehen keine Mehrkosten.'
  },
  en: {
    subtitle: 'Personal gift ideas in seconds',
    badge: 'Recommended Gift Idea',
    defaultReason: 'Discover this top-rated gift idea on Amazon.de.',
    amazonBtn: 'View on Amazon.de *',
    moreBtn: 'Find your own gift idea',
    shareBtn: 'Share idea',
    copied: 'Link copied!',
    disclaimer: '* Affiliate link: As an Amazon Associate I earn from qualifying purchases at no extra cost to you.'
  },
  ru: {
    subtitle: 'Идеи подарков за секунды',
    badge: 'Рекомендованный подарок',
    defaultReason: 'Отличная идея подарка с высоким рейтингом на Amazon.de.',
    amazonBtn: 'Смотреть на Amazon.de *',
    moreBtn: 'Подобрать свой подарок',
    shareBtn: 'Поделиться идеей',
    copied: 'Ссылка скопирована!',
    disclaimer: '* Партнёрская ссылка: как партнёр Amazon я получаю комиссию с покупок без доплат для тебя.'
  },
  tr: {
    subtitle: 'Saniyeler içinde hediye fikirleri',
    badge: 'Önerilen Hediye Fikri',
    defaultReason: 'Amazon.de üzerinde yüksek puanlı harika bir hediye fikri.',
    amazonBtn: 'Amazon.de\'de incele *',
    moreBtn: 'Kendi hediyeni bul',
    shareBtn: 'Fikri paylaş',
    copied: 'Bağlantı kopyalandı!',
    disclaimer: '* Ortaklık bağlantısı: Amazon iş ortağı olarak uygun satışlardan ek maliyet olmadan komisyon kazanıyorum.'
  },
  ar: {
    subtitle: 'أفكار هدايا مخصصة في ثوانٍ',
    badge: 'فكرة هدية مقترحة',
    defaultReason: 'اكتشف هذه الهدية المميزة بتقييمات عالية على Amazon.de.',
    amazonBtn: 'عرض على Amazon.de *',
    moreBtn: 'ابحث عن هديتك الخاصة',
    shareBtn: 'مشاركة الفكرة',
    copied: 'تم نسخ الرابط!',
    disclaimer: '* رابط تسويق بالعمولة: بصفتي شريكاً لأمازون، أحصل على عمولة من المبيعات المؤهلة دون أي تكلفة إضافية عليك.'
  },
  pl: {
    subtitle: 'Pomysły na prezent w sekundy',
    badge: 'Polecany pomysł na prezent',
    defaultReason: 'Sprawdź ten świetnie oceniany pomysł na prezent na Amazon.de.',
    amazonBtn: 'Zobacz na Amazon.de *',
    moreBtn: 'Znajdź własny prezent',
    shareBtn: 'Udostępnij',
    copied: 'Link skopiowany!',
    disclaimer: '* Link partnerski: jako partner Amazon zarabiam na kwalifikujących się zakupach bez dodatkowych kosztów dla Ciebie.'
  },
  uk: {
    subtitle: 'Ідеї подарунків за секунди',
    badge: 'Рекомендований подарунок',
    defaultReason: 'Чудова ідея подарунка з високим рейтингом на Amazon.de.',
    amazonBtn: 'Дивитись на Amazon.de *',
    moreBtn: 'Підібрати свій подарунок',
    shareBtn: 'Поділитися ідеєю',
    copied: 'Посилання скопійовано!',
    disclaimer: '* Партнерське посилання: як партнер Amazon я отримую комісію з покупок без жодних доплат для тебе.'
  },
  ro: {
    subtitle: 'Idei de cadouri în câteva secunde',
    badge: 'Idee de cadou recomandată',
    defaultReason: 'Descoperă această idee de cadou cu recenzii excelente pe Amazon.de.',
    amazonBtn: 'Vezi pe Amazon.de *',
    moreBtn: 'Găsește propriul cadou',
    shareBtn: 'Distribuie ideea',
    copied: 'Link copiat!',
    disclaimer: '* Link de afiliere: ca partener Amazon, câștig din vânzările eligibile fără costuri suplimentare pentru tine.'
  },
  it: {
    subtitle: 'Idee regalo in pochi secondi',
    badge: 'Idea regalo consigliata',
    defaultReason: 'Scopri questa idea regalo molto apprezzata su Amazon.de.',
    amazonBtn: 'Vedi su Amazon.de *',
    moreBtn: 'Trova il tuo regalo',
    shareBtn: 'Condividi idea',
    copied: 'Link copiato!',
    disclaimer: '* Link di affiliazione: in qualità di Affiliato Amazon ricevo un guadagno dagli acquisti idonei senza costi aggiuntivi per te.'
  }
};

export default function handler(req, res) {
  const q = req.query || {};
  const packed = decodePayload(q.d);

  const rawLang = String((packed ? packed[6] : q.l) || '').toLowerCase();
  const lang = SUPPORTED_LANGS.includes(rawLang) ? rawLang : 'de';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const texts = TEXTS[lang];

  const rawSlug = String(q.slug || '').slice(0, 80);
  const rawTitle = String((packed ? packed[0] : q.t) || '').trim() || slugToTitle(rawSlug) || 'Geschenkidee';
  const title = rawTitle.slice(0, 85);
  const reason = String((packed ? packed[1] : q.r) || '').trim().slice(0, 180);
  const query = (String((packed ? packed[2] : q.q) || '').trim() || title).slice(0, 80);
  const emoji = Array.from(String((packed ? packed[3] : q.e) || '🎁').trim()).slice(0, 4).join('') || '🎁';

  const min = parseInt(packed ? packed[4] : q.min, 10);
  const max = parseInt(packed ? packed[5] : q.max, 10);
  const hasBudget = Number.isFinite(min) && Number.isFinite(max) && min > 0 && max >= min && max <= 1000;
  const budgetText = hasBudget ? `${min}–${max} €` : '';

  const priceParams = hasBudget ? `&low-price=${min}&high-price=${max}` : '';
  const amazonUrl = `https://www.amazon.de/s?k=${encodeURIComponent(query)}${priceParams}&rh=p_72%3A419117031&tag=kigeschenkfinder-21`;

  const host = req.headers['x-forwarded-host'] || req.headers.host || 'ki-geschenkfinder.vercel.app';
  const baseUrl = `https://${host}`;
  const finalReason = reason || texts.defaultReason;

  const ogParams = new URLSearchParams({
    t: title,
    r: finalReason,
    e: emoji,
    b: budgetText
  });
  const ogImage = `${baseUrl}/api/og?${ogParams.toString()}`;

  const ogTitle = `${emoji} ${title}${budgetText ? ` (${budgetText})` : ''} | KI-Geschenkfinder`;
  const ogDescription = `${finalReason} — Amazon.de (4★+)`;

  const sharePayload = JSON.stringify({
    title: `${emoji} ${title}`,
    text: `${emoji} ${title}${budgetText ? ` (${budgetText})` : ''} — ${finalReason}`
  }).replace(/</g, '\\u003c');

  const html = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(ogTitle)}</title>
  <meta name="description" content="${escapeHtml(ogDescription)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="KI-Geschenkfinder" />
  <meta property="og:title" content="${escapeHtml(ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(ogDescription)}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:image:width" content="800" />
  <meta property="og:image:height" content="420" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(155deg, #f5f0ff 0%, #fff0f7 52%, #f8f9fc 100%);
      color: #1e1b2e;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 16px;
    }
    .wrap { width: 100%; max-width: 440px; }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      margin-bottom: 18px;
      justify-content: center;
      direction: ltr;
    }
    .logo-box {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25);
      flex-shrink: 0;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #6d28d9 0%, #db2777 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.15;
    }
    .brand-sub { font-size: 12px; color: #6b7280; margin-top: 2px; }
    .card {
      background: #ffffff;
      border-radius: 24px;
      padding: 26px 22px;
      box-shadow: 0 16px 40px rgba(91, 33, 182, 0.10);
      border: 1px solid rgba(139, 92, 246, 0.14);
      text-align: center;
    }
    .emoji-circle {
      width: 74px;
      height: 74px;
      margin: 0 auto 14px;
      border-radius: 22px;
      background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 38px;
    }
    .pills {
      display: flex;
      gap: 8px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .pill {
      font-size: 12px;
      font-weight: 700;
      padding: 5px 11px;
      border-radius: 999px;
      background: #f3e8ff;
      color: #6d28d9;
    }
    .pill.budget { background: #ecfdf5; color: #047857; }
    h1 {
      font-size: 22px;
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 10px;
      color: #111827;
    }
    .reason {
      font-size: 15px;
      line-height: 1.5;
      color: #4b5563;
      margin-bottom: 22px;
    }
    .btn-amazon {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 15px 18px;
      border-radius: 16px;
      background: linear-gradient(135deg, #ff9900 0%, #f97316 100%);
      color: #111827;
      font-size: 16px;
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 10px 22px rgba(249, 115, 22, 0.28);
      margin-bottom: 12px;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 6px;
    }
    .btn-sec {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 12px 14px;
      border-radius: 14px;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      color: #374151;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }
    .btn-primary-soft {
      background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
      color: #ffffff;
      border: none;
    }
    .disclaimer {
      margin-top: 16px;
      font-size: 11px;
      line-height: 1.45;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <a class="brand" href="/">
      <div class="logo-box">🎁</div>
      <div>
        <div class="brand-title">KI-Geschenkfinder</div>
        <div class="brand-sub">${escapeHtml(texts.subtitle)}</div>
      </div>
    </a>

    <div class="card">
      <div class="emoji-circle">${escapeHtml(emoji)}</div>
      <div class="pills">
        <span class="pill">✨ ${escapeHtml(texts.badge)}</span>
        ${budgetText ? `<span class="pill budget">💶 ${escapeHtml(budgetText)}</span>` : ''}
      </div>
      <h1>${escapeHtml(title)}</h1>
      <p class="reason">${escapeHtml(finalReason)}</p>

      <a class="btn-amazon" href="${escapeHtml(amazonUrl)}" target="_blank" rel="nofollow sponsored noopener noreferrer">
        🛒 ${escapeHtml(texts.amazonBtn)}
      </a>

      <div class="actions">
        <a class="btn-sec btn-primary-soft" href="/">✨ ${escapeHtml(texts.moreBtn)}</a>
        <button class="btn-sec" id="shareBtn" type="button">📤 ${escapeHtml(texts.shareBtn)}</button>
      </div>

      <p class="disclaimer">${escapeHtml(texts.disclaimer)}</p>
    </div>
  </div>

  <script>
    const payload = ${sharePayload};
    const btn = document.getElementById('shareBtn');
    btn.addEventListener('click', async () => {
      const url = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({ title: payload.title, text: payload.text, url });
          return;
        } catch (e) {}
      }
      try {
        await navigator.clipboard.writeText(url);
        const orig = btn.textContent;
        btn.textContent = '✅ ${escapeHtml(texts.copied)}';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      } catch (e) {}
    });
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(html);
}

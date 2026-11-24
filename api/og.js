import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const THEMES = [
  {
    bg: 'linear-gradient(135deg, #6d28d9 0%, #db2777 55%, #2563eb 100%)',
    iconBg: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)',
  },
  {
    bg: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 52%, #10b981 100%)',
    iconBg: 'linear-gradient(135deg, #e0f2fe 0%, #d1fae5 100%)',
  },
  {
    bg: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 52%, #ec4899 100%)',
    iconBg: 'linear-gradient(135deg, #ffedd5 0%, #fce7f3 100%)',
  },
  {
    bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)',
    iconBg: 'linear-gradient(135deg, #e0e7ff 0%, #cffafe 100%)',
  },
  {
    bg: 'linear-gradient(135deg, #be185d 0%, #f43f5e 52%, #fb923c 100%)',
    iconBg: 'linear-gradient(135deg, #ffe4e6 0%, #ffedd5 100%)',
  },
  {
    bg: 'linear-gradient(135deg, #059669 0%, #0d9488 52%, #2563eb 100%)',
    iconBg: 'linear-gradient(135deg, #d1fae5 0%, #dbeafe 100%)',
  },
];

function pickTheme(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return THEMES[hash % THEMES.length];
}

async function loadFont(text) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    });
    const css = await cssRes.text();
    const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('t') || 'Geschenkidee').slice(0, 70);
  const reason = (searchParams.get('r') || '').slice(0, 125);
  const emoji = Array.from(searchParams.get('e') || '🎁').slice(0, 4).join('') || '🎁';
  const budget = (searchParams.get('b') || '').slice(0, 24);

  const theme = pickTheme(title);
  const allText = `${title}${reason}${budget}KI-GeschenkfinderAmazon.de 4★+ki-geschenkfinder.vercel.app`;
  const fontData = await loadFont(allText);

  const textChildren = [
    budget
      ? {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignSelf: 'flex-start',
              backgroundColor: '#ecfdf5',
              color: '#047857',
              fontSize: '26px',
              fontWeight: 700,
              padding: '8px 20px',
              borderRadius: '999px',
            },
            children: `💶 ${budget}`,
          },
        }
      : null,
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          fontSize: title.length > 36 ? '40px' : '48px',
          fontWeight: 700,
          color: '#111827',
          lineHeight: 1.18,
        },
        children: title,
      },
    },
    reason
      ? {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: '25px',
              color: '#4b5563',
              lineHeight: 1.35,
            },
            children: reason,
          },
        }
      : null,
  ].filter(Boolean);

  const tree = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '44px 52px',
        backgroundImage: theme.bg,
        fontFamily: fontData ? '"Noto Sans", sans-serif' : 'sans-serif',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    fontSize: '28px',
                    fontWeight: 700,
                    padding: '10px 24px',
                    borderRadius: '999px',
                  },
                  children: '🎁 KI-Geschenkfinder',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#ff9900',
                    color: '#111827',
                    fontSize: '24px',
                    fontWeight: 700,
                    padding: '10px 22px',
                    borderRadius: '999px',
                  },
                  children: 'Amazon.de · 4★+',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.96)',
              borderRadius: '34px',
              padding: '38px 44px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '190px',
                    height: '190px',
                    borderRadius: '32px',
                    backgroundImage: theme.iconBg,
                    fontSize: '104px',
                    marginRight: '38px',
                    flexShrink: 0,
                  },
                  children: emoji,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    gap: '14px',
                  },
                  children: textChildren,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              color: 'rgba(255,255,255,0.92)',
              fontSize: '24px',
              fontWeight: 700,
            },
            children: [
              {
                type: 'div',
                props: { style: { display: 'flex' }, children: 'ki-geschenkfinder.vercel.app' },
              },
              {
                type: 'div',
                props: { style: { display: 'flex' }, children: '✨ Geschenkidee ansehen' },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(tree, {
    width: 1200,
    height: 630,
    fonts: fontData
      ? [{ name: 'Noto Sans', data: fontData, weight: 700, style: 'normal' }]
      : undefined,
  });
}

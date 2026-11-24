import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const THEMES = [
  {
    bg: 'linear-gradient(135deg, #6d28d9 0%, #db2777 55%, #2563eb 100%)',
    iconBg: '#f3e8ff',
  },
  {
    bg: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 52%, #10b981 100%)',
    iconBg: '#e0f2fe',
  },
  {
    bg: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 52%, #ec4899 100%)',
    iconBg: '#ffedd5',
  },
  {
    bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)',
    iconBg: '#e0e7ff',
  },
  {
    bg: 'linear-gradient(135deg, #be185d 0%, #f43f5e 52%, #fb923c 100%)',
    iconBg: '#ffe4e6',
  },
  {
    bg: 'linear-gradient(135deg, #059669 0%, #0d9488 52%, #2563eb 100%)',
    iconBg: '#d1fae5',
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
  const title = (searchParams.get('t') || 'Geschenkidee').slice(0, 68);
  const reason = (searchParams.get('r') || '').slice(0, 115);
  const emoji = Array.from(searchParams.get('e') || '🎁').slice(0, 4).join('') || '🎁';
  const budget = (searchParams.get('b') || '').slice(0, 24);

  const theme = pickTheme(title);
  const allText = `${title}${reason}${budget}€KI-GeschenkfinderAmazon.de Topki-geschenkfinder.vercel.appGeschenkidee ansehen`;
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
              fontSize: '18px',
              fontWeight: 700,
              padding: '5px 14px',
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
          fontSize: title.length > 34 ? '27px' : '32px',
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
              fontSize: '17px',
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
        padding: '28px 34px',
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
                    backgroundColor: 'rgba(255,255,255,0.22)',
                    color: '#ffffff',
                    fontSize: '19px',
                    fontWeight: 700,
                    padding: '6px 16px',
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
                    fontSize: '16px',
                    fontWeight: 700,
                    padding: '6px 15px',
                    borderRadius: '999px',
                  },
                  children: 'Amazon.de · Top',
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
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '24px 28px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '124px',
                    height: '124px',
                    borderRadius: '22px',
                    backgroundColor: theme.iconBg,
                    fontSize: '68px',
                    marginRight: '24px',
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
                    gap: '10px',
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
              color: 'rgba(255,255,255,0.94)',
              fontSize: '16px',
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
    width: 800,
    height: 420,
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
    fonts: fontData
      ? [{ name: 'Noto Sans', data: fontData, weight: 700, style: 'normal' }]
      : undefined,
  });
}

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://ki-geschenkfinder.vercel.app';
const AFFILIATE_TAG = 'kigeschenkfinder-21';

let cachedGifts = null;

async function loadGifts() {
  if (Array.isArray(cachedGifts) && cachedGifts.length > 0) return cachedGifts;
  try {
    const raw = readFileSync(join(process.cwd(), 'gifts.json'), 'utf8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      cachedGifts = parsed;
      return cachedGifts;
    }
  } catch {
    // Fallback to public URL if file trace didn't bundle gifts.json
  }
  try {
    const res = await fetch(`${SITE_URL}/gifts.json`);
    if (res.ok) {
      const parsed = await res.json();
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedGifts = parsed;
        return cachedGifts;
      }
    }
  } catch {
    // Silent fallback
  }
  return [];
}

const PAGES = [
  {
    slug: '18-geburtstag',
    lang: 'de',
    group: 'Alter',
    shortTitle: '18. Geburtstag',
    title: 'Was schenkt man zum 18. Geburtstag? — Top Geschenkideen & KI-Finder',
    description: 'Kreative, coole Geschenkideen zum 18. Geburtstag (Volljährigkeit) für junge Männer & Frauen — geprüft ab 4★ auf Amazon.de.',
    h1: 'Geschenke zum 18. Geburtstag — Ideen zur Volljährigkeit',
    intro: 'Der 18. Geburtstag ist ein echter Meilenstein: Führerschein, erste eigene Reisen, Technik-Upgrades oder coole Gadgets fürs Zimmer stehen ganz oben auf der Wunschliste. Hier findest du 8 beliebte Geschenkideen im optimalen Budgetbereich.',
    age: 18, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['tech', 'auto', 'travel'], budget: 40, minPrice: 15, maxPrice: 70,
    keywords: ['powerbank', 'led', 'auto', 'bluetooth', 'gadget', 'reise', 'technik'],
    faqs: [
      { q: 'Wie viel gibt man zum 18. Geburtstag aus?', a: 'Unter Freunden sind 20 bis 40 € üblich. Familie, Paten oder Partner schenken oft zwischen 50 und 150 € oder legen für ein größeres Geschenk zusammen.' },
      { q: 'Was kommt mit 18 besonders gut an?', a: 'Praktische Technik-Gadgets, nützliches Zubehör fürs erste Auto, Erlebnis-Ideen oder stilvolle Accessoires für die erste eigene Wohnung bzw. WG.' }
    ]
  },
  {
    slug: '25-geburtstag',
    lang: 'de',
    group: 'Alter',
    shortTitle: '25. Geburtstag',
    title: 'Was schenkt man zum 25. Geburtstag? — 8 starke Geschenkideen',
    description: 'Originelle Geschenkideen zum 25. Geburtstag für Freunde, Partner oder Geschwister. Passende Amazon-Treffer (4★+) & kostenloser KI-Berater.',
    h1: 'Was schenkt man zum 25. Geburtstag?',
    intro: 'Mit 25 stehen viele mitten im Berufsstart, Studium oder in der ersten richtigen Wohnung. Gefragt sind Geschenke, die Alltag und Freizeit spürbar aufwerten — von smarten Alltagshelfern über Genuss-Sets bis hin zu Hobby-Highlights.',
    age: 25, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['tech', 'kitchen', 'travel', 'cozy'], budget: 40, minPrice: 20, maxPrice: 70,
    keywords: ['kaffee', 'espresso', 'technik', 'reise', 'wellness', 'smart', 'cocktail'],
    faqs: [
      { q: 'Was schenkt man jemandem mit 25, der schon alles hat?', a: 'Am besten funktionieren hochwertige Alltags-Upgrades (z. B. rund um Kaffee, Kochen, Reisen oder Wellness), die man sich selbst selten gönnt.' },
      { q: 'Wie finde ich ein noch persönlicheres Geschenk für 25-Jährige?', a: 'Starte unten unseren kostenlosen KI-Geschenkfinder mit voreingestelltem Alter 25 und ergänze 1–2 Hobbys oder einen kurzen Hinweis.' }
    ]
  },
  {
    slug: '30-geburtstag',
    lang: 'de',
    group: 'Alter',
    shortTitle: '30. Geburtstag',
    title: 'Geschenke zum 30. Geburtstag — Originelle Ideen für Männer & Frauen',
    description: 'Die besten Geschenkideen zum 30. Geburtstag: hochwertig, persönlich und ohne Kitsch. Direkt für Amazon.de (4★+) gefiltert.',
    h1: 'Geschenke zum 30. Geburtstag — stilvoll & sinnvoll',
    intro: 'Der 30. Geburtstag darf gern etwas Besonderes sein: Statt billiger Scherzartikel punkten langlebige Küchen-, Technik-, Grill- oder Wellness-Geschenke, die wirklich genutzt werden.',
    age: 30, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['kitchen', 'cozy', 'tech', 'grill'], budget: 50, minPrice: 25, maxPrice: 85,
    keywords: ['kaffee', 'grill', 'wellness', 'küche', 'smart', 'wein', 'whisky'],
    faqs: [
      { q: 'Welches Budget passt zum 30. Geburtstag?', a: 'Für gute Freunde liegt das Budget meist bei 30 bis 60 €. Bei runden Geburtstagen lohnt sich auch ein gemeinsames Gruppengeschenk ab 80 €.' },
      { q: 'Scherzgeschenk oder hochwertiges Geschenk zum 30.?', a: 'Eine kleine witzige Karte kombiniert mit einem wirklich nützlichen Geschenk kommt fast immer besser an als reine Gag-Artikel.' }
    ]
  },
  {
    slug: '40-geburtstag',
    lang: 'de',
    group: 'Alter',
    shortTitle: '40. Geburtstag',
    title: 'Geschenkideen zum 40. Geburtstag — Hochwertig & persönlich',
    description: 'Sinnvolle und besondere Geschenke zum 40. Geburtstag für Männer und Frauen. Sofort stöbern oder per KI-Geschenkfinder verfeinern.',
    h1: 'Geschenke zum 40. Geburtstag — Klasse statt Masse',
    intro: 'Zum 40. Geburtstag zählt Qualität: Hochwertige Genuss-Ideen, praktische Helfer für Haus, Garten und Auto sowie entspannende Wellness-Highlights sind echte Volltreffer.',
    age: 40, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['grill', 'kitchen', 'auto', 'cozy'], budget: 55, minPrice: 25, maxPrice: 95,
    keywords: ['grill', 'kaffee', 'werkzeug', 'massage', 'auto', 'küche', 'garten'],
    faqs: [
      { q: 'Worüber freuen sich 40-Jährige besonders?', a: 'Über Dinge, die Zeit sparen, Entspannung bringen oder das eigene Hobby (Kochen, Grillen, Heimwerken, Reisen) auf ein neues Niveau heben.' }
    ]
  },
  {
    slug: '50-geburtstag',
    lang: 'de',
    group: 'Alter',
    shortTitle: '50. Geburtstag',
    title: 'Geschenke zum 50. Geburtstag — Besondere Ideen für Sie & Ihn',
    description: 'Stilvolle Geschenkideen zum 50. Geburtstag: Genuss, Garten, Wellness, Technik und praktische Highlights mit 4★+ Bewertung.',
    h1: 'Geschenke zum 50. Geburtstag — langlebig & geschmackvoll',
    intro: 'Ein halbes Jahrhundert verdient durchdachte Geschenke mit echtem Mehrwert. Unsere Auswahl kombiniert beliebte Klassiker mit cleveren Ideen, die nicht im Schrank verstauben.',
    age: 50, gender: 'all', relation: 'parents', occasion: 'birthday', hobbies: ['kitchen', 'grill', 'cozy', 'diy'], budget: 60, minPrice: 30, maxPrice: 110,
    keywords: ['genuss', 'garten', 'grill', 'wellness', 'massage', 'kaffee', 'werkzeug'],
    faqs: [
      { q: 'Was schenkt man zum 50. Geburtstag für Eltern oder Freunde?', a: 'Hochwertige Genuss-Sets, praktische Garten- und Küchenhelfer, Wellness-Geräte oder gemeinsame Erlebnis-Ideen stehen ganz oben.' }
    ]
  },
  {
    slug: '60-geburtstag',
    lang: 'de',
    group: 'Alter',
    shortTitle: '60. Geburtstag',
    title: 'Geschenke zum 60. Geburtstag — Herzliche & sinnvolle Ideen',
    description: 'Passende Geschenkideen zum 60. Geburtstag für Eltern, Großeltern und Freunde. Komfort, Genuss & Hobby-Ideen auf einen Blick.',
    h1: 'Geschenke zum 60. Geburtstag — Freude, die bleibt',
    intro: 'Zum 60. Geburtstag sind Komfort, Entspannung und genussvolle Momente im Alltag besonders beliebt. Entdecke ausgewählte Ideen mit sehr guten Bewertungen.',
    age: 60, gender: 'all', relation: 'parents', occasion: 'birthday', hobbies: ['cozy', 'kitchen', 'travel', 'grill'], budget: 60, minPrice: 25, maxPrice: 110,
    keywords: ['wellness', 'wärme', 'tee', 'kaffee', 'garten', 'massage', 'komfort'],
    faqs: [
      { q: 'Was eignet sich gut für den 60. Geburtstag?', a: 'Geschenke für Gemütlichkeit, Garten, Kochen, Reisen oder leichte Technik-Helfer mit einfacher Bedienung kommen hervorragend an.' }
    ]
  },
  {
    slug: 'wichteln-unter-15-euro',
    lang: 'de',
    group: 'Anlass',
    shortTitle: 'Wichteln unter 15 €',
    title: 'Wichtelgeschenke unter 15 Euro — Nützliche & witzige Ideen',
    description: 'Die besten Wichtelgeschenke unter 15 € für Büro, Kollegen, Freunde & Schule — sinnvoll, originell und schnell über Amazon.de lieferbar.',
    h1: 'Wichtelgeschenke unter 15 Euro — klein, aber oho',
    intro: 'Beim Wichteln mit 10–15 € Limit zählt Kreativität: Niemand möchte den nächsten Staubfänger. Diese Ideen sind alltagstauglich, neutral und sorgen garantiert für ein Lächeln.',
    age: 30, gender: 'all', relation: 'colleague', occasion: 'wichteln', hobbies: ['kitchen', 'cozy', 'humor', 'tech'], budget: 15, minPrice: 5, maxPrice: 16,
    keywords: ['wichtel', 'büro', 'tasse', 'tee', 'kaffee', 'spaß', 'mini', 'gadget'],
    faqs: [
      { q: 'Was ist ein gutes neutrales Wichtelgeschenk unter 15 €?', a: 'Verbrauchbare Genuss-Ideen (Kaffee, Tee, Gewürze), clevere Schreibtisch-Gadgets, warme Socken oder kleine Lichter passen fast immer — egal wen man zieht.' }
    ]
  },
  {
    slug: 'wichteln-unter-20-euro',
    lang: 'de',
    group: 'Anlass',
    shortTitle: 'Wichteln unter 20 €',
    title: 'Wichtelgeschenke unter 20 Euro — Originelle Ideen für alle',
    description: 'Sinnvolle und kreative Wichtelgeschenke bis 20 € für Kollegen, Freunde oder Familie. Mit 4★+ Filter auf Amazon.de.',
    h1: 'Wichtelgeschenke unter 20 Euro — die wirklich ankommen',
    intro: 'Mit bis zu 20 Euro gibt es deutlich mehr Spielraum für richtig hochwertige Kleinigkeiten: Thermobecher, Mini-Gadgets, Spiele oder gemütliche Wohlfühl-Sets.',
    age: 30, gender: 'all', relation: 'colleague', occasion: 'wichteln', hobbies: ['cozy', 'kitchen', 'tech', 'humor'], budget: 20, minPrice: 10, maxPrice: 22,
    keywords: ['thermo', 'becher', 'spiel', 'kerze', 'gadget', 'kaffee', 'tee'],
    faqs: [
      { q: 'Was schenkt man beim Wichteln unter 20 Euro im Büro?', a: 'Hochwertige Thermobecher, praktische Kabel-Organizer, gute Schokoladen-/Gewürz-Sets oder entspannende Duftkerzen sind sichere Treffer.' }
    ]
  },
  {
    slug: 'weihnachten-eltern',
    lang: 'de',
    group: 'Anlass',
    shortTitle: 'Weihnachten Eltern',
    title: 'Weihnachtsgeschenke für Eltern — Sinnvolle Ideen für Mama & Papa',
    description: 'Schöne und nützliche Weihnachtsgeschenke für Eltern, die schon alles haben. Gemeinsame Zeit, Genuss & Komfort-Ideen (4★+).',
    h1: 'Weihnachtsgeschenke für Eltern — herzlich & nützlich',
    intro: '„Wir wünschen uns nichts“ — den Satz kennt fast jeder von Mama und Papa. Mit diesen Ideen rund um Gemütlichkeit, Küche und Alltag triffst du trotzdem genau ins Schwarze.',
    age: 55, gender: 'all', relation: 'parents', occasion: 'christmas', hobbies: ['cozy', 'kitchen', 'grill', 'travel'], budget: 50, minPrice: 25, maxPrice: 90,
    keywords: ['eltern', 'wellness', 'küche', 'kaffee', 'massage', 'decke', 'garten'],
    faqs: [
      { q: 'Was schenkt man Eltern zu Weihnachten, wenn sie nichts wollen?', a: 'Etwas zum gemeinsamen Genießen (Feinkost, Kaffee-/Tee-Sets), Komfort für zu Hause (Wärme, Licht, Massage) oder praktische Helfer, die den Alltag erleichtern.' }
    ]
  },
  {
    slug: 'weihnachten-kollegen',
    lang: 'de',
    group: 'Anlass',
    shortTitle: 'Weihnachten Kollegen',
    title: 'Weihnachtsgeschenke für Kollegen — Kleine & stilvolle Ideen',
    description: 'Passende Weihnachtsgeschenke für Arbeitskollegen und Team (10–25 €): nicht zu privat, aber sympathisch und nützlich.',
    h1: 'Weihnachtsgeschenke für Kollegen — sympathisch & passend',
    intro: 'Für Kollegen sollte ein Geschenk wertschätzend, alltagstauglich und nicht zu persönlich sein. Ideal sind Büro-Upgrades, Kaffee-/Tee-Begleiter oder kleine Wohlfühl-Ideen.',
    age: 35, gender: 'all', relation: 'colleague', occasion: 'christmas', hobbies: ['kitchen', 'tech', 'cozy'], budget: 20, minPrice: 10, maxPrice: 28,
    keywords: ['büro', 'becher', 'kaffee', 'tee', 'organizer', 'powerbank', 'schreibtisch'],
    faqs: [
      { q: 'Wie viel kostet ein typisches Weihnachtsgeschenk für Kollegen?', a: 'Meist liegen kleine Aufmerksamkeiten im Job zwischen 10 und 25 Euro.' }
    ]
  },
  {
    slug: 'weihnachten-mann',
    lang: 'de',
    group: 'Anlass',
    shortTitle: 'Weihnachten Mann',
    title: 'Weihnachtsgeschenke für Männer — Praktisch, cool & originell',
    description: 'Die besten Weihnachtsgeschenke für ihn: Technik, Auto, Grillen, Werkzeug & Genuss. Sofort vergleichen oder per KI personalisieren.',
    h1: 'Weihnachtsgeschenke für Männer — echte Volltreffer',
    intro: 'Ob Partner, Vater, Bruder oder bester Freund: Männer lieben durchdachte Gadgets, smartes Zubehör für Auto & Werkstatt oder hochwertige Genuss-Ideen.',
    age: 35, gender: 'm', relation: 'partner', occasion: 'christmas', hobbies: ['tech', 'auto', 'diy', 'grill'], budget: 45, minPrice: 20, maxPrice: 80,
    keywords: ['werkzeug', 'auto', 'grill', 'technik', 'kompressor', 'multitool', 'whisky'],
    faqs: [
      { q: 'Was schenkt man einem Mann zu Weihnachten, der wunschlos ist?', a: 'Clevere Alltags-Gadgets (z. B. Akku-Kompressor, Multitool, smarte Beleuchtung) oder hochwertige Grill- und Kaffee-Upgrades funktionieren fast immer.' }
    ]
  },
  {
    slug: 'weihnachten-frau',
    lang: 'de',
    group: 'Anlass',
    shortTitle: 'Weihnachten Frau',
    title: 'Weihnachtsgeschenke für Frauen — Stilvoll, gemütlich & persönlich',
    description: 'Schöne Weihnachtsgeschenke für sie: Wellness, Cozy Home, Küche, Reisen und liebevolle Highlights mit 4★+ Bewertung.',
    h1: 'Weihnachtsgeschenke für Frauen — mit Gefühl ausgewählt',
    intro: 'Von entspannenden Wellness-Momenten bis zu ästhetischen Highlights für Zuhause und Reisen: Hier sind 8 liebevolle Geschenkideen für Partnerin, Mama, Schwester oder Freundin.',
    age: 32, gender: 'f', relation: 'partner', occasion: 'christmas', hobbies: ['cozy', 'kitchen', 'travel'], budget: 45, minPrice: 20, maxPrice: 80,
    keywords: ['wellness', 'kerze', 'spa', 'decke', 'schmuck', 'tee', 'kaffee', 'reise'],
    faqs: [
      { q: 'Welche Weihnachtsgeschenke kommen bei Frauen besonders gut an?', a: 'Alles rund um Entspannung und Me-Time, schöne Wohn-Accessoires, stilvolles Reisezubehör oder hochwertige Kaffee- und Tee-Rituale.' }
    ]
  },
  {
    slug: 'autofahrer',
    lang: 'de',
    group: 'Hobby',
    shortTitle: 'Für Autofahrer',
    title: 'Geschenke für Autofahrer — Nützliches & cooles Autozubehör',
    description: 'Die besten Geschenkideen für Autofans und Vielfahrer: Akku-Kompressor, Pflege-Sets, smarte Gadgets & Ordnungshelfer (4★+).',
    h1: 'Geschenke für Autofahrer & Autofans',
    intro: 'Wer viel unterwegs ist oder sein Auto liebt, freut sich über clevere Helfer für Kofferraum, Cockpit und Pflege. Alle Ideen sind alltagstauglich und top bewertet.',
    age: 32, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['auto', 'tech', 'diy'], budget: 45, minPrice: 15, maxPrice: 80,
    keywords: ['auto', 'kompressor', 'pflege', 'kofferraum', 'dashcam', 'sauger', 'halterung'],
    faqs: [
      { q: 'Was ist ein wirklich nützliches Geschenk für Vielfahrer?', a: 'Ein digitaler Akku-Reifenkompressor, ein kompakter Handstaubsauger fürs Cockpit, hochwertige Autopflege-Sets oder eine magnetische Handyhalterung.' }
    ]
  },
  {
    slug: 'kaffeeliebhaber',
    lang: 'de',
    group: 'Hobby',
    shortTitle: 'Kaffeeliebhaber',
    title: 'Geschenke für Kaffeeliebhaber — Espresso, Barista & Zubehör',
    description: 'Kreative Geschenkideen für Kaffee- und Espresso-Fans: Barista-Tools, Mühlen, Thermobecher & Probier-Sets auf Amazon.de.',
    h1: 'Geschenke für Kaffeeliebhaber & Hobby-Baristas',
    intro: 'Für echte Kaffee-Fans gibt es kaum etwas Schöneres als ein Upgrade fürs Morgenritual — von der Handmühle über doppelwandige Gläser bis zur smarten Kaffee-Waage.',
    age: 32, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['kitchen', 'cozy'], budget: 35, minPrice: 15, maxPrice: 70,
    keywords: ['kaffee', 'espresso', 'barista', 'mühle', 'milch', 'becher', 'tasse'],
    faqs: [
      { q: 'Was schenkt man jemandem, der schon eine gute Kaffeemaschine hat?', a: 'Zubehör wie eine präzise Kaffeewaage mit Timer, doppelwandige Espressogläser, einen auslaufsicheren Isolierbecher oder Spezialitäten-Bohnen.' }
    ]
  },
  {
    slug: 'grillfans',
    lang: 'de',
    group: 'Hobby',
    shortTitle: 'Grill- & BBQ-Fans',
    title: 'Geschenke für Grillfans — BBQ-Zubehör, Thermometer & Gewürze',
    description: 'Die besten Geschenkideen für Grillmeister: smarte Grillthermometer, Burger-Pressen, Rubs & Grillbesteck (4★+ auf Amazon.de).',
    h1: 'Geschenke für Grillfans & BBQ-Meister',
    intro: 'Egal ob Gasgrill, Holzkohle oder Smoker: Mit praktischem BBQ-Zubehör, Gewürz-Sets und präzisen Thermometern triffst du bei jedem Grillfan garantiert den richtigen Garpunkt.',
    age: 38, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['grill', 'kitchen'], budget: 40, minPrice: 15, maxPrice: 80,
    keywords: ['grill', 'bbq', 'thermometer', 'gewürz', 'burger', 'smoker', 'zange'],
    faqs: [
      { q: 'Welches Grill-Geschenk kommt fast immer gut an?', a: 'Ein digitales Bluetooth-Grillthermometer, ein hochwertiges Gewürz-/Rub-Probier-Set, eine Gusseisen-Burgerpresse oder eine stabile Grilllampe.' }
    ]
  },
  {
    slug: 'gamer',
    lang: 'de',
    group: 'Hobby',
    shortTitle: 'Für Gamer',
    title: 'Geschenke für Gamer — Coole Setup-Gadgets & Zubehör',
    description: 'Originelle Geschenkideen für PC- & Konsolen-Gamer: RGB-Licht, Controller-Halter, Desk-Accessoires & smarte Gadgets.',
    h1: 'Geschenke für Gamer — Upgrades fürs Gaming-Setup',
    intro: 'Spiele haben die meisten Gamer selbst schon im Blick — beim Setup-Zubehör dagegen lassen sich echte Überraschungen landen: Ambient-Licht, Ordnung auf dem Schreibtisch und Komfort.',
    age: 24, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['gaming', 'tech'], budget: 35, minPrice: 15, maxPrice: 70,
    keywords: ['gaming', 'gamer', 'led', 'rgb', 'controller', 'headset', 'mauspad', 'tastatur'],
    faqs: [
      { q: 'Was schenkt man Gamern, wenn man ihre Spiele nicht kennt?', a: 'Plattformunabhängige Setup-Upgrades wie RGBIC-Hintergrundbeleuchtung, ein großes Mauspad, ein Headset-Ständer oder ergonomisches Zubehör.' }
    ]
  },
  {
    slug: 'einzug',
    lang: 'de',
    group: 'Anlass',
    shortTitle: 'Einzug / Neue Wohnung',
    title: 'Geschenke zum Einzug — Nützliche & stilvolle Ideen zur Einweihung',
    description: 'Moderne Geschenke zum Einzug in die neue Wohnung oder ins Haus: besser als nur Brot & Salz — praktisch, gemütlich & 4★+ bewertet.',
    h1: 'Geschenke zum Einzug & zur Einweihungsparty',
    intro: 'Nach dem Umzug fehlen oft genau die schönen Details, die aus vier Wänden ein Zuhause machen: stimmungsvolles Licht, clevere Küchenhelfer oder kleine Werkzeug-Retter.',
    age: 30, gender: 'all', relation: 'friend', occasion: 'housewarming', hobbies: ['cozy', 'kitchen', 'diy'], budget: 35, minPrice: 15, maxPrice: 65,
    keywords: ['einzug', 'wohnung', 'küche', 'licht', 'lampe', 'kerze', 'werkzeug', 'brett'],
    faqs: [
      { q: 'Wie viel schenkt man zum Einzug?', a: 'Für Freunde und Nachbarn sind 20 bis 40 € üblich, bei nahen Verwandten oder fürs eigene Haus oft 50 € aufwärts.' }
    ]
  },
  {
    slug: 'podarok-muzhchine-25-let',
    lang: 'ru',
    group: 'По-русски (DE)',
    shortTitle: 'Мужчине на 25 лет',
    title: 'Что подарить мужчине на 25 лет в Германии — 8 идей с Amazon.de',
    description: 'Толковые идеи подарка парню, другу или мужу на 25 лет с быстрой доставкой по Германии через Amazon.de (рейтинг 4★+) и бесплатный ИИ-подбор.',
    h1: 'Что подарить мужчине на 25 лет в Германии?',
    intro: 'В 25 лет лучше всего заходят полезные и стильные вещи, которыми пользуешься каждый день: гаджеты, аксессуары для авто, кофе, гейминг или компактная техника. Все варианты ниже легко заказать на Amazon.de с доставкой по Германии.',
    age: 25, gender: 'm', relation: 'friend', occasion: 'birthday', hobbies: ['tech', 'auto', 'gaming', 'kitchen'], budget: 45, minPrice: 20, maxPrice: 75,
    keywords: ['auto', 'kompressor', 'powerbank', 'kaffee', 'gaming', 'led', 'technik'],
    faqs: [
      { q: 'Какой бюджет обычно закладывают на 25 лет в Германии?', a: 'Друзья чаще всего дарят подарки в пределах 25–50 €, а партнёры или близкие родственники — от 50 до 120 €.' },
      { q: 'Как подобрать идею точнее под конкретное хобби?', a: 'Нажми кнопку запуска ИИ-подбора ниже — возраст 25 лет уже будет выставлен, останется только отметить интересы или написать пару слов о человеке.' }
    ]
  },
  {
    slug: 'podarok-kollege-do-20-evro',
    lang: 'ru',
    group: 'По-русски (DE)',
    shortTitle: 'Коллеге до 20 €',
    title: 'Подарок коллеге до 20 евро в Германии (Wichteln и праздники)',
    description: 'Удачные идеи подарка коллеге или на Тайного Санту (Wichteln) в Германии до 20 €. Полезные варианты с Amazon.de без банальных сувениров.',
    h1: 'Что подарить коллеге до 20 € в Германии (включая Wichteln)',
    intro: 'На работе в Германии часто играют в Wichteln (Тайного Санту) или дарят небольшие подарки с лимитом 15–20 €. Здесь собраны нейтральные и реально полезные идеи, за которые не будет неловко.',
    age: 32, gender: 'all', relation: 'colleague', occasion: 'wichteln', hobbies: ['kitchen', 'cozy', 'tech'], budget: 20, minPrice: 10, maxPrice: 22,
    keywords: ['becher', 'kaffee', 'tee', 'büro', 'kerze', 'powerbank', 'organizer'],
    faqs: [
      { q: 'Что лучше не дарить коллегам в Германии?', a: 'Слишком личные вещи (парфюм, одежду), алкоголь без уверенности, что человек его пьёт, и дешёвые безделушки. Термокружка, хороший чай/кофе или полезный гаджет — беспроигрышный выбор.' }
    ]
  },
  {
    slug: 'podarki-na-rozhdestvo-germaniya',
    lang: 'ru',
    group: 'По-русски (DE)',
    shortTitle: 'На Рождество (DE)',
    title: 'Идеи подарков на Рождество в Германии — быстрая доставка Amazon.de',
    description: 'Что подарить родным, друзьям и партнёру на Рождество (Weihnachten) в Германии. Проверенные идеи с рейтингом 4★+ и ИИ-генератор подарков.',
    h1: 'Идеи подарков на Рождество в Германии (Weihnachten)',
    intro: 'Перед Рождеством в Германии магазины переполнены, а идеи заканчиваются быстрее всего. Мы отобрали универсальные подарки для уюта, кухни, отдыха и хобби — всё доступно на Amazon.de.',
    age: 35, gender: 'all', relation: 'parents', occasion: 'christmas', hobbies: ['cozy', 'kitchen', 'tech', 'grill'], budget: 45, minPrice: 20, maxPrice: 80,
    keywords: ['wellness', 'kaffee', 'küche', 'decke', 'licht', 'grill', 'massage'],
    faqs: [
      { q: 'Когда лучше заказывать подарки к Рождеству в Германии?', a: 'Оптимально до 15–18 декабря, чтобы посылки точно успели дойти до 24 декабря без предпраздничных задержек DHL.' }
    ]
  }
];

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function safeJsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

function buildAmazonUrl(query, minPrice, maxPrice) {
  const cleanQ = String(query || 'Geschenkidee').replace(/bestseller/gi, '').trim();
  const params = new URLSearchParams({
    k: cleanQ,
    'low-price': String(minPrice),
    'high-price': String(maxPrice),
    rh: 'p_72:419117031',
    tag: AFFILIATE_TAG
  });
  return `https://www.amazon.de/s?${params.toString()}`;
}

function buildGeneratorUrl(page) {
  const params = new URLSearchParams({
    age: String(page.age),
    gender: page.gender || 'all',
    rel: page.relation || 'friend',
    occ: page.occasion || 'birthday',
    bud: String(page.budget || 35),
    lang: page.lang || 'de'
  });
  if (Array.isArray(page.hobbies) && page.hobbies.length) {
    params.set('hob', page.hobbies.join(','));
  }
  return `/?${params.toString()}`;
}

function selectGifts(gifts, page) {
  const isMinor = page.age < 18;
  let pool = gifts.filter(item => {
    if (isMinor && item.adultOnly) return false;
    if (page.age < (item.minAge || 0) - 3 || page.age > (item.maxAge || 99) + 6) return false;
    if (page.gender !== 'all' && item.gender && item.gender !== 'all' && item.gender !== page.gender) return false;
    return true;
  });

  if (pool.length < 8) {
    pool = gifts.filter(item => !(isMinor && item.adultOnly));
  }

  const scored = pool.map(item => {
    let score = 50;
    const price = Number(item.price) || page.budget;
    if (price >= page.minPrice && price <= page.maxPrice) {
      score += 36;
    } else {
      const dist = Math.min(Math.abs(price - page.minPrice), Math.abs(price - page.maxPrice));
      score += Math.max(0, 22 - dist * 0.7);
    }
    if (Array.isArray(item.relations) && item.relations.includes(page.relation)) score += 16;
    if (Array.isArray(item.occasions) && item.occasions.includes(page.occasion)) score += 18;
    if (Array.isArray(page.hobbies) && Array.isArray(item.hobbies)) {
      page.hobbies.forEach(h => {
        if (item.hobbies.includes(h)) score += 24;
      });
    }
    if (Array.isArray(page.keywords) && page.keywords.length) {
      const blob = `${item.query || ''} ${item.title?.de || ''} ${item.title?.ru || ''} ${item.reason?.de || ''}`.toLowerCase();
      page.keywords.forEach(kw => {
        if (blob.includes(kw)) score += 15;
      });
    }
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score || String(a.item.id).localeCompare(String(b.item.id)));
  return scored.slice(0, 8).map(x => x.item);
}

const BASE_CSS = `
  :root {
    color-scheme: light dark;
    --bg: #f6f7fb;
    --surface: #ffffff;
    --surface-2: #f1f3f9;
    --text: #111827;
    --muted: #5b6474;
    --border: rgba(17, 24, 39, 0.09);
    --accent: #7c3aed;
    --accent-2: #ec4899;
    --accent-soft: rgba(124, 58, 237, 0.11);
    --amz: #ff9900;
    --amz-text: #111827;
    --shadow: 0 12px 32px rgba(17, 24, 39, 0.08);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0b0f19;
      --surface: #131a2a;
      --surface-2: #1b2438;
      --text: #f3f6fc;
      --muted: #98a4bc;
      --border: rgba(255, 255, 255, 0.09);
      --accent: #8b5cf6;
      --accent-2: #f472b6;
      --accent-soft: rgba(139, 92, 246, 0.18);
      --shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
    }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif;
    line-height: 1.5;
    background-image:
      radial-gradient(600px circle at 10% -10%, rgba(124,58,237,0.14), transparent 60%),
      radial-gradient(500px circle at 95% 0%, rgba(236,72,153,0.12), transparent 55%);
  }
  .topbar {
    position: sticky; top: 0; z-index: 20;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .topbar-in {
    max-width: 780px; margin: 0 auto; padding: 10px 16px;
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .logo {
    font-weight: 900; font-size: 1.08rem; text-decoration: none;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .top-cta {
    text-decoration: none; font-size: 0.82rem; font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff; padding: 8px 13px; border-radius: 12px; white-space: nowrap;
  }
  .wrap { max-width: 780px; margin: 0 auto; padding: 18px 16px 48px; }
  .crumbs { font-size: 0.8rem; color: var(--muted); margin-bottom: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .crumbs a { color: var(--accent); text-decoration: none; font-weight: 600; }
  h1 { margin: 0 0 10px; font-size: clamp(1.45rem, 4.5vw, 2.05rem); line-height: 1.18; letter-spacing: -0.02em; }
  .intro { margin: 0 0 18px; color: var(--muted); font-size: 0.96rem; }
  .meta-pills { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 18px; }
  .pill {
    font-size: 0.76rem; font-weight: 700; padding: 5px 11px; border-radius: 999px;
    background: var(--accent-soft); color: var(--accent);
  }
  .grid { display: grid; gap: 12px; }
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 20px; padding: 16px; box-shadow: var(--shadow);
  }
  .gift-row { display: flex; gap: 12px; align-items: flex-start; }
  .ico {
    width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
    background: var(--surface-2); border: 1px solid var(--border);
    display: grid; place-items: center; font-size: 24px;
  }
  .gift-h2 { margin: 0 0 4px; font-size: 1.02rem; font-weight: 800; }
  .gift-p { margin: 0 0 12px; font-size: 0.88rem; color: var(--muted); }
  .amz-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    width: 100%; text-decoration: none; background: var(--amz); color: var(--amz-text);
    font-weight: 800; font-size: 0.88rem; padding: 11px 14px; border-radius: 12px;
  }
  .cta-box {
    margin: 22px 0; padding: 20px; border-radius: 22px; text-align: center;
    background: var(--accent-soft); border: 1.5px solid rgba(124, 58, 237, 0.3);
  }
  .cta-box h2 { margin: 0 0 6px; font-size: 1.15rem; }
  .cta-box p { margin: 0 0 14px; color: var(--muted); font-size: 0.9rem; }
  .cta-big {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    text-decoration: none; background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff; font-weight: 800; font-size: 0.96rem; padding: 13px 22px; border-radius: 14px;
  }
  .faq { margin: 22px 0; display: grid; gap: 8px; }
  details {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 15px; padding: 12px 15px;
  }
  summary { font-weight: 800; font-size: 0.92rem; cursor: pointer; }
  details p { margin: 8px 0 0; font-size: 0.87rem; color: var(--muted); }
  .rel-title { font-size: 1rem; font-weight: 800; margin: 24px 0 10px; }
  .rel-links { display: flex; flex-wrap: wrap; gap: 8px; }
  .rel-chip {
    text-decoration: none; font-size: 0.82rem; font-weight: 700;
    color: var(--text); background: var(--surface); border: 1px solid var(--border);
    padding: 8px 12px; border-radius: 12px;
  }
  .rel-chip:hover { border-color: var(--accent); color: var(--accent); }
  footer { margin-top: 28px; text-align: center; font-size: 0.78rem; color: var(--muted); }
  footer a { color: var(--accent); font-weight: 700; }
`;

function renderHubHtml() {
  const canonical = `${SITE_URL}/geschenke`;
  const groups = ['Alter', 'Anlass', 'Hobby', 'По-русски (DE)'];
  const sections = groups.map(grp => {
    const items = PAGES.filter(p => p.group === grp);
    return `
      <h2 class="rel-title">${escapeHtml(grp)}</h2>
      <div class="rel-links">
        ${items.map(p => `<a class="rel-chip" href="/geschenke/${p.slug}">🎁 ${escapeHtml(p.shortTitle)}</a>`).join('')}
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <title>Geschenk-Ratgeber & Ideen nach Alter, Anlass & Hobby — KI-Geschenkfinder</title>
  <meta name="description" content="Alle Geschenk-Ratgeber im Überblick: 18., 25., 30., 40., 50., 60. Geburtstag, Wichteln unter 15 & 20 €, Weihnachten, Autofahrer, Kaffee, Grill & Gaming." />
  <link rel="canonical" href="${canonical}" />
  <style>${BASE_CSS}</style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-in">
      <a class="logo" href="/">🎁 KI-Geschenkfinder</a>
      <a class="top-cta" href="/">✨ KI-Finder starten</a>
    </div>
  </header>
  <main class="wrap">
    <nav class="crumbs"><a href="/">KI-Geschenkfinder</a> › <span>Ratgeber</span></nav>
    <h1>Geschenk-Ratgeber nach Alter, Anlass & Hobby</h1>
    <p class="intro">Wähle direkt das passende Thema für schnelle Ideen mit Amazon.de-Filter (4★+) oder starte unseren interaktiven KI-Geschenkfinder.</p>
    ${sections}
    <div class="cta-box">
      <h2>Nichts Passendes dabei?</h2>
      <p>Unser KI-Geschenkfinder kombiniert Alter, Anlass, Budget und deine eigene Idee in Sekunden.</p>
      <a class="cta-big" href="/">✨ Persönliche Geschenke finden</a>
    </div>
    <footer>* Als Amazon-Partner verdiene ich an qualifizierten Verkäufen (Tag: ${AFFILIATE_TAG}). <a href="/">Zur Startseite</a></footer>
  </main>
</body>
</html>`;
}

function renderGuideHtml(page, items) {
  const isRu = page.lang === 'ru';
  const canonical = `${SITE_URL}/geschenke/${page.slug}`;
  const genUrl = buildGeneratorUrl(page);

  const labels = isRu
    ? {
        home: 'KI-Geschenkfinder',
        guides: 'Подборки',
        startTop: '✨ ИИ-подбор',
        budgetPill: `💶 Бюджет: ${page.minPrice}–${page.maxPrice} €`,
        ratingPill: '⭐ Рейтинг Amazon.de 4★+',
        amzBtn: 'Смотреть на Amazon.de *',
        ctaTitle: 'Нужен ещё более точный подарок?',
        ctaText: 'Открой наш бесплатный ИИ-генератор — фильтры для этой темы уже выставлены, останется добавить пару деталей.',
        ctaBtn: '✨ Запустить ИИ-подбор с этими фильтрами',
        faqHead: 'Частые вопросы',
        moreHead: 'Другие подборки подарков',
        disclosure: `* Участник партнёрской программы Amazon EU (тег: ${AFFILIATE_TAG}). Цена для покупателя не меняется.`,
        backHome: 'На главную'
      }
    : {
        home: 'KI-Geschenkfinder',
        guides: 'Ratgeber',
        startTop: '✨ KI-Finder',
        budgetPill: `💶 Budget: ${page.minPrice}–${page.maxPrice} €`,
        ratingPill: '⭐ Amazon.de 4★+ Filter',
        amzBtn: 'Auf Amazon.de ansehen *',
        ctaTitle: 'Noch persönlicher gesucht?',
        ctaText: 'Starte unseren kostenlosen KI-Geschenkfinder mit voreingestellten Filtern und gib optional Hobbys oder einen eigenen Hinweis ein.',
        ctaBtn: '✨ KI-Finder mit diesen Filtern starten',
        faqHead: 'Häufige Fragen',
        moreHead: 'Weitere beliebte Geschenk-Ratgeber',
        disclosure: `* Als Amazon-Partner verdiene ich an qualifizierten Verkäufen (Tag: ${AFFILIATE_TAG}). Für dich entstehen keine Mehrkosten.`,
        backHome: 'Zur Startseite'
      };

  const giftCardsHtml = items.map(item => {
    const title = item.title?.[page.lang] || item.title?.de || item.query;
    const reason = item.reason?.[page.lang] || item.reason?.de || '';
    const amzUrl = buildAmazonUrl(item.query, page.minPrice, page.maxPrice);
    return `
      <article class="card">
        <div class="gift-row">
          <div class="ico" aria-hidden="true">${escapeHtml(item.emoji || '🎁')}</div>
          <div style="flex:1;min-width:0">
            <h2 class="gift-h2">${escapeHtml(title)}</h2>
            <p class="gift-p">${escapeHtml(reason)}</p>
          </div>
        </div>
        <a class="amz-btn" href="${amzUrl}" target="_blank" rel="noopener noreferrer sponsored">🛒 ${labels.amzBtn}</a>
      </article>
    `;
  }).join('');

  const faqHtml = (page.faqs || []).map(f => `
    <details>
      <summary>${escapeHtml(f.q)}</summary>
      <p>${escapeHtml(f.a)}</p>
    </details>
  `).join('');

  const related = PAGES.filter(p => p.slug !== page.slug).slice(0, 10);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: labels.home, item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: labels.guides, item: `${SITE_URL}/geschenke` },
          { '@type': 'ListItem', position: 3, name: page.shortTitle, item: canonical }
        ]
      },
      {
        '@type': 'ItemList',
        name: page.h1,
        numberOfItems: items.length,
        itemListElement: items.map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: item.title?.[page.lang] || item.title?.de || item.query,
          description: item.reason?.[page.lang] || item.reason?.de || ''
        }))
      },
      {
        '@type': 'FAQPage',
        mainEntity: (page.faqs || []).map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${page.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE_URL}/og-banner.jpg?v=2" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">${safeJsonLd(jsonLd)}</script>
  <style>${BASE_CSS}</style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-in">
      <a class="logo" href="/">🎁 KI-Geschenkfinder</a>
      <a class="top-cta" href="${genUrl}">${labels.startTop}</a>
    </div>
  </header>

  <main class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
      <a href="/">${labels.home}</a> › <a href="/geschenke">${labels.guides}</a> › <span>${escapeHtml(page.shortTitle)}</span>
    </nav>

    <h1>${escapeHtml(page.h1)}</h1>
    <p class="intro">${escapeHtml(page.intro)}</p>

    <div class="meta-pills">
      <span class="pill">${labels.budgetPill}</span>
      <span class="pill">${labels.ratingPill}</span>
    </div>

    <section class="grid" aria-label="Geschenkideen">
      ${giftCardsHtml}
    </section>

    <section class="cta-box">
      <h2>${labels.ctaTitle}</h2>
      <p>${labels.ctaText}</p>
      <a class="cta-big" href="${genUrl}">${labels.ctaBtn}</a>
    </section>

    ${faqHtml ? `<section class="faq"><h2 class="rel-title" style="margin-top:0">${labels.faqHead}</h2>${faqHtml}</section>` : ''}

    <section>
      <h2 class="rel-title">${labels.moreHead}</h2>
      <div class="rel-links">
        ${related.map(r => `<a class="rel-chip" href="/geschenke/${r.slug}">🎁 ${escapeHtml(r.shortTitle)}</a>`).join('')}
        <a class="rel-chip" href="/geschenke">📚 Alle 20 Ratgeber →</a>
      </div>
    </section>

    <footer>
      <div>${labels.disclosure}</div>
      <div style="margin-top:8px"><a href="/">${labels.backHome}</a> · <a href="/geschenke">${labels.guides}</a></div>
    </footer>
  </main>
</body>
</html>`;
}

export default async function handler(req, res) {
  const slug = String(req.query?.slug || '').trim().toLowerCase();

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');

  if (!slug) {
    return res.status(200).send(renderHubHtml());
  }

  const page = PAGES.find(p => p.slug === slug);
  if (!page) {
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    return res.status(404).send(renderHubHtml());
  }

  const gifts = await loadGifts();
  const items = selectGifts(gifts, page);
  return res.status(200).send(renderGuideHtml(page, items));
}

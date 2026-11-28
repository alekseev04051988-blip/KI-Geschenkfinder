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
    intro: 'Der 18. Geburtstag ist ein echter Meilenstein: Führerschein, erste eigene Reisen, Technik-Upgrades oder coole Gadgets fürs Zimmer stehen ganz oben auf der Wunschliste. Hier findest du 8 täglich aktualisierte Ideen im passenden Budget.',
    aiPrompt: 'Abwechslungsreiche, moderne Geschenkideen zum 18. Geburtstag (Volljährigkeit)',
    age: 18, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['tech', 'auto', 'travel', 'gaming'], budget: 40, minPrice: 15, maxPrice: 70,
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
    aiPrompt: 'Originelle, gemischte Geschenkideen zum 25. Geburtstag ohne Klischees',
    age: 25, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['tech', 'kitchen', 'travel', 'cozy', 'sport'], budget: 40, minPrice: 20, maxPrice: 70,
    keywords: ['technik', 'reise', 'wellness', 'smart', 'kaffee', 'cocktail', 'sport'],
    faqs: [
      { q: 'Was schenkt man jemandem mit 25, der schon alles hat?', a: 'Am besten funktionieren hochwertige Alltags-Upgrades (z. B. rund um Kochen, Reisen, Technik oder Wellness), die man sich selbst selten gönnt.' },
      { q: 'Wie finde ich ein noch persönlicheres Geschenk für 25-Jährige?', a: 'Klicke direkt hier auf „5 frische Ideen per Live-KI“ oder starte den KI-Geschenkfinder mit voreingestelltem Alter 25.' }
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
    aiPrompt: 'Hochwertige, originelle Geschenkideen zum 30. Geburtstag ohne billigen Kitsch',
    age: 30, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['kitchen', 'cozy', 'tech', 'grill', 'travel'], budget: 50, minPrice: 25, maxPrice: 85,
    keywords: ['grill', 'wellness', 'küche', 'smart', 'wein', 'whisky', 'reise'],
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
    aiPrompt: 'Stilvolle und nützliche Geschenkideen zum 40. Geburtstag',
    age: 40, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['grill', 'kitchen', 'auto', 'cozy', 'diy'], budget: 55, minPrice: 25, maxPrice: 95,
    keywords: ['grill', 'werkzeug', 'massage', 'auto', 'küche', 'garten', 'genuss'],
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
    aiPrompt: 'Besondere, geschmackvolle Geschenkideen zum 50. Geburtstag',
    age: 50, gender: 'all', relation: 'parents', occasion: 'birthday', hobbies: ['kitchen', 'grill', 'cozy', 'diy', 'travel'], budget: 60, minPrice: 30, maxPrice: 110,
    keywords: ['genuss', 'garten', 'grill', 'wellness', 'massage', 'werkzeug', 'reise'],
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
    aiPrompt: 'Herzliche, komfortable und sinnvolle Geschenkideen zum 60. Geburtstag',
    age: 60, gender: 'all', relation: 'parents', occasion: 'birthday', hobbies: ['cozy', 'kitchen', 'travel', 'grill'], budget: 60, minPrice: 25, maxPrice: 110,
    keywords: ['wellness', 'wärme', 'tee', 'garten', 'massage', 'komfort', 'reise'],
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
    aiPrompt: 'Neutrale, nützliche und originelle Wichtelgeschenke bis maximal 15 Euro',
    age: 30, gender: 'all', relation: 'colleague', occasion: 'wichteln', hobbies: ['kitchen', 'cozy', 'humor', 'tech'], budget: 15, minPrice: 5, maxPrice: 16,
    keywords: ['wichtel', 'büro', 'tasse', 'tee', 'spaß', 'mini', 'gadget'],
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
    aiPrompt: 'Kreative und alltagstaugliche Wichtelgeschenke unter 20 Euro',
    age: 30, gender: 'all', relation: 'colleague', occasion: 'wichteln', hobbies: ['cozy', 'kitchen', 'tech', 'humor'], budget: 20, minPrice: 10, maxPrice: 22,
    keywords: ['thermo', 'becher', 'spiel', 'kerze', 'gadget', 'tee', 'büro'],
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
    aiPrompt: 'Herzliche, nützliche Weihnachtsgeschenke für Eltern, die schon alles haben',
    age: 55, gender: 'all', relation: 'parents', occasion: 'christmas', hobbies: ['cozy', 'kitchen', 'grill', 'travel'], budget: 50, minPrice: 25, maxPrice: 90,
    keywords: ['eltern', 'wellness', 'küche', 'massage', 'decke', 'garten', 'wärme'],
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
    aiPrompt: 'Sympathische, nicht zu private Weihnachtsgeschenke für Arbeitskollegen (10-25 Euro)',
    age: 35, gender: 'all', relation: 'colleague', occasion: 'christmas', hobbies: ['kitchen', 'tech', 'cozy'], budget: 20, minPrice: 10, maxPrice: 28,
    keywords: ['büro', 'becher', 'tee', 'organizer', 'powerbank', 'schreibtisch'],
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
    aiPrompt: 'Praktische, coole und abwechslungsreiche Weihnachtsgeschenke für Männer',
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
    aiPrompt: 'Stilvolle, liebevolle und gemütliche Weihnachtsgeschenke für Frauen',
    age: 32, gender: 'f', relation: 'partner', occasion: 'christmas', hobbies: ['cozy', 'kitchen', 'travel'], budget: 45, minPrice: 20, maxPrice: 80,
    keywords: ['wellness', 'kerze', 'spa', 'decke', 'schmuck', 'tee', 'reise'],
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
    aiPrompt: 'Clevere, wirklich nützliche Geschenke für Autofahrer und Autofans',
    age: 32, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['auto'], budget: 45, minPrice: 15, maxPrice: 80,
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
    aiPrompt: 'Kreative Barista- und Kaffee-Geschenke für echte Kaffeeliebhaber',
    age: 32, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['kitchen'], budget: 35, minPrice: 15, maxPrice: 70,
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
    aiPrompt: 'Praktische und coole BBQ- und Grill-Geschenke für Grillfans',
    age: 38, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['grill'], budget: 40, minPrice: 15, maxPrice: 80,
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
    aiPrompt: 'Coole Setup-Gadgets und plattformunabhängige Geschenke für PC- und Konsolen-Gamer',
    age: 24, gender: 'all', relation: 'friend', occasion: 'birthday', hobbies: ['gaming'], budget: 35, minPrice: 15, maxPrice: 70,
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
    aiPrompt: 'Moderne, nützliche Geschenke zum Einzug in die neue Wohnung oder ins Haus',
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
    intro: 'В 25 лет лучше всего заходят полезные и стильные вещи, которыми пользуешься каждый день: гаджеты, аксессуары для авто, кофе, гейминг или компактная техника. Подборка обновляется ежедневно из нашей базы идей для Amazon.de.',
    aiPrompt: 'Разнообразные и толковые подарки мужчине на 25 лет, которые легко купить на Amazon.de',
    age: 25, gender: 'm', relation: 'friend', occasion: 'birthday', hobbies: ['tech', 'auto', 'gaming', 'sport'], budget: 45, minPrice: 20, maxPrice: 75,
    keywords: ['auto', 'kompressor', 'powerbank', 'gaming', 'led', 'technik', 'sport'],
    faqs: [
      { q: 'Какой бюджет обычно закладывают на 25 лет в Германии?', a: 'Друзья чаще всего дарят подарки в пределах 25–50 €, а партнёры или близкие родственники — от 50 до 120 €.' },
      { q: 'Как подобрать идею точнее под конкретное хобби?', a: 'Нажми кнопку «5 свежих идей от Живого ИИ» прямо под списком или открой полный ИИ-подбор с уже выставленным возрастом 25 лет.' }
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
    aiPrompt: 'Нейтральные и полезные подарки коллеге или на Wichteln до 20 евро',
    age: 32, gender: 'all', relation: 'colleague', occasion: 'wichteln', hobbies: ['kitchen', 'cozy', 'tech', 'humor'], budget: 20, minPrice: 10, maxPrice: 22,
    keywords: ['becher', 'tee', 'büro', 'kerze', 'powerbank', 'organizer'],
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
    aiPrompt: 'Уютные, полезные и разнообразные подарки на Рождество (Weihnachten) в Германии',
    age: 35, gender: 'all', relation: 'parents', occasion: 'christmas', hobbies: ['cozy', 'kitchen', 'tech', 'grill'], budget: 45, minPrice: 20, maxPrice: 80,
    keywords: ['wellness', 'küche', 'decke', 'licht', 'grill', 'massage'],
    faqs: [
      { q: 'Когда лучше заказывать подарки к Рождеству в Германии?', a: 'Оптимально до 15–18 декабря, чтобы посылки точно успели дойти до 24 декабря без предпраздничных задержек DHL.' }
    ]
  }
];

const STOP_WORDS = new Set([
  'smart', 'smarte', 'smarter', 'smartes', 'elektrisch', 'elektrische', 'elektrischer',
  'digital', 'digitale', 'digitaler', 'kompakt', 'kompakte', 'kompakter', 'tragbar', 'tragbare',
  'mini', 'profi', 'premium', 'original', 'praktisch', 'praktische', 'praktischer',
  'hochwertig', 'hochwertige', 'hochwertiges', 'edelstahl', 'kreativ', 'modern', 'moderne',
  'geschenk', 'geschenke', 'geschenkset', 'geschenkidee', 'kinder', 'damen', 'herren',
  'männer', 'frauen', 'unterwegs', 'büro', 'zuhause', 'alltag', 'set', 'kit', 'box',
  'fürs', 'damit', 'durch', 'einen', 'einem', 'einer', 'dieses', 'immer', 'ideal',
  'набор', 'умный', 'умная', 'умное', 'портативный', 'компактный', 'подарок', 'подарочный', 'дома', 'офиса'
]);

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function safeJsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

function hashUnit(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
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

function extractTokens(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-zäöüßа-яё0-9]+/gi, ' ')
    .split(' ')
    .filter(w => w.length >= 5 && !STOP_WORDS.has(w));
}

function isSimilarGift(candidate, chosenList) {
  const candReason = String(candidate.reason?.de || '').toLowerCase().trim();
  const candTitleWords = new Set(extractTokens(`${candidate.title?.de || ''} ${candidate.query || ''}`));

  for (const prev of chosenList) {
    if (candidate.id === prev.id) return true;
    const prevReason = String(prev.reason?.de || '').toLowerCase().trim();
    if (candReason && prevReason && candReason === prevReason) return true;

    const prevTitleWords = extractTokens(`${prev.title?.de || ''} ${prev.query || ''}`);
    let shared = 0;
    for (const w of prevTitleWords) {
      if (candTitleWords.has(w)) {
        if (w.length >= 7) return true;
        shared++;
      }
    }
    if (shared >= 2) return true;
  }
  return false;
}

function selectGifts(gifts, page, dayKey) {
  const isMinor = page.age < 18;
  const isHobbyPage = page.group === 'Hobby';

  let pool = gifts.filter(item => {
    if (isMinor && item.adultOnly) return false;
    if (page.age < (item.minAge || 0) - 3 || page.age > (item.maxAge || 99) + 6) return false;
    if (page.gender !== 'all' && item.gender && item.gender !== 'all' && item.gender !== page.gender) return false;
    return true;
  });

  if (pool.length < 16) {
    pool = gifts.filter(item => !(isMinor && item.adultOnly));
  }

  const scored = pool.map(item => {
    let score = 50;
    const price = Number(item.price) || page.budget;
    if (price >= page.minPrice && price <= page.maxPrice) {
      score += 32;
    } else {
      const dist = Math.min(Math.abs(price - page.minPrice), Math.abs(price - page.maxPrice));
      score += Math.max(0, 18 - dist * 0.7);
    }

    if (Array.isArray(item.relations) && item.relations.includes(page.relation)) score += 14;
    if (Array.isArray(item.occasions) && item.occasions.includes(page.occasion)) score += 16;

    if (Array.isArray(page.hobbies) && Array.isArray(item.hobbies)) {
      let hobbyHits = 0;
      page.hobbies.forEach(h => {
        if (item.hobbies.includes(h)) hobbyHits++;
      });
      score += isHobbyPage ? hobbyHits * 34 : Math.min(22, hobbyHits * 14);
    }

    if (Array.isArray(page.keywords) && page.keywords.length) {
      const blob = `${item.query || ''} ${item.title?.de || ''} ${item.title?.ru || ''} ${item.reason?.de || ''}`.toLowerCase();
      let kwBonus = 0;
      page.keywords.forEach(kw => {
        if (blob.includes(kw)) kwBonus += 10;
      });
      score += Math.min(isHobbyPage ? 28 : 16, kwBonus);
    }

    const dailyJitter = hashUnit(`${dayKey}|${page.slug}|${item.id}`) * 24;
    return { item, score: score + dailyJitter };
  });

  scored.sort((a, b) => b.score - a.score || String(a.item.id).localeCompare(String(b.item.id)));

  const chosen = [];
  const hobbyCounts = Object.create(null);
  const maxPerHobby = isHobbyPage ? 8 : 2;

  for (const { item } of scored) {
    if (chosen.length >= 8) break;
    if (isSimilarGift(item, chosen)) continue;
    const primaryHobby = (Array.isArray(item.hobbies) && item.hobbies[0]) || 'other';
    if ((hobbyCounts[primaryHobby] || 0) >= maxPerHobby) continue;
    chosen.push(item);
    hobbyCounts[primaryHobby] = (hobbyCounts[primaryHobby] || 0) + 1;
  }

  if (chosen.length < 8) {
    for (const { item } of scored) {
      if (chosen.length >= 8) break;
      if (isSimilarGift(item, chosen)) continue;
      chosen.push(item);
    }
  }

  return chosen;
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
  .card.ai-card {
    border-color: rgba(124, 58, 237, 0.35);
    background: color-mix(in srgb, var(--surface) 92%, var(--accent) 8%);
  }
  .gift-row { display: flex; gap: 12px; align-items: flex-start; }
  .ico {
    width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
    background: var(--surface-2); border: 1px solid var(--border);
    display: grid; place-items: center; font-size: 24px;
  }
  .ai-pill {
    display: inline-block; font-size: 0.7rem; font-weight: 800;
    padding: 2px 8px; border-radius: 999px; margin-bottom: 4px;
    background: var(--accent-soft); color: var(--accent);
  }
  .gift-h2 { margin: 0 0 4px; font-size: 1.02rem; font-weight: 800; }
  .gift-p { margin: 0 0 12px; font-size: 0.88rem; color: var(--muted); }
  .amz-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    width: 100%; text-decoration: none; background: var(--amz); color: var(--amz-text);
    font-weight: 800; font-size: 0.88rem; padding: 11px 14px; border-radius: 12px;
  }
  .action-bar {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px;
  }
  @media (max-width: 520px) {
    .action-bar { grid-template-columns: 1fr; }
  }
  .act-primary, .act-secondary {
    border-radius: 14px; padding: 13px 16px; font-family: inherit;
    font-weight: 800; font-size: 0.9rem; cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  }
  .act-primary {
    border: none;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff; box-shadow: 0 10px 24px rgba(124, 58, 237, 0.28);
  }
  .act-secondary {
    border: 1.5px solid var(--border);
    background: var(--surface); color: var(--text);
  }
  .act-primary:disabled, .act-secondary:disabled { opacity: 0.65; cursor: wait; }
  .ai-panel {
    margin-top: 16px; padding: 16px; border-radius: 20px;
    border: 1.5px dashed var(--accent); background: var(--accent-soft);
  }
  .ai-panel-head { font-weight: 800; font-size: 0.92rem; margin-bottom: 8px; }
  .ai-input-row { display: flex; gap: 8px; }
  .ai-input {
    flex: 1; min-width: 0; border: 1.5px solid var(--border);
    background: var(--surface); color: var(--text); border-radius: 12px;
    padding: 10px 12px; font-size: 0.88rem; font-family: inherit; outline: none;
  }
  .ai-input:focus { border-color: var(--accent); }
  .ai-send {
    border: none; border-radius: 12px; padding: 0 16px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    color: #fff; font-weight: 800; font-size: 0.86rem; cursor: pointer;
  }
  .ai-status { font-size: 0.82rem; color: var(--muted); margin-top: 8px; min-height: 1.1em; }
  .ai-results-wrap { margin-top: 14px; display: grid; gap: 12px; }
  .cta-box {
    margin: 22px 0; padding: 20px; border-radius: 22px; text-align: center;
    background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow);
  }
  .cta-box h2 { margin: 0 0 6px; font-size: 1.1rem; }
  .cta-box p { margin: 0 0 14px; color: var(--muted); font-size: 0.88rem; }
  .cta-big {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    text-decoration: none; background: var(--surface-2); border: 1.5px solid var(--accent);
    color: var(--accent); font-weight: 800; font-size: 0.92rem; padding: 11px 20px; border-radius: 13px;
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
    <p class="intro">Wähle direkt das passende Thema für täglich aktualisierte Ideen mit Amazon.de-Filter (4★+) oder starte unseren interaktiven KI-Geschenkfinder.</p>
    ${sections}
    <div class="cta-box">
      <h2>Nichts Passendes dabei?</h2>
      <p>Unser KI-Geschenkfinder kombiniert Alter, Anlass, Budget und deine eigene Idee in Sekunden.</p>
      <a class="cta-big" href="/">✨ Persönliche Geschenke finden</a>
    </div>
    <footer>* Als Amazon-Partner verdiene ich an qualifizierten Verkäufen (Tag: ${AFFILIATE_TAG}). <a href="/">Zur Startseite</a> · <a href="/impressum" rel="nofollow">Impressum</a> · <a href="/datenschutz" rel="nofollow">Datenschutz</a></footer>
  </main>
</body>
</html>`;
}

function renderGuideHtml(page, items, dayKey) {
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
        freshPill: `🔄 Обновлено ${dayKey.split('-').reverse().join('.')}`,
        amzBtn: 'Смотреть на Amazon.de *',
        btnAi: '✨ 5 свежих идей от Живого ИИ',
        btnShuffle: '🔄 Другие из базы (503 идеи)',
        aiBoxHead: '✨ Хочешь ещё точнее? Уточни хобби для Живого ИИ:',
        aiPh: 'Например: любит собак, баню или минимализм...',
        aiGo: 'ИИ ✨',
        aiLoading: '⏳ Живой ИИ придумывает 5 свежих идей...',
        aiDone: '✅ Готово! 5 новых идей от Живого ИИ:',
        aiError: '⚠️ Живой ИИ сейчас занят — попробуй нажать «Другие из базы» или повтори через минуту.',
        aiBadge: 'Живой ИИ ✨',
        shuffleLoading: '⏳ Подбираем другую восьмёрку из базы...',
        shuffleDone: '✅ Показаны другие идеи из базы.',
        ctaTitle: 'Нужно поменять возраст, пол или бюджет?',
        ctaText: 'Открой полный ИИ-генератор — базовые фильтры этой страницы уже подставлены.',
        ctaBtn: '⚙️ Настроить все фильтры',
        faqHead: 'Частые вопросы',
        moreHead: 'Другие подборки подарков',
        allGuides: '📚 Все 20 подборок →',
        disclosure: `* Участник партнёрской программы Amazon EU (тег: ${AFFILIATE_TAG}). Цена для покупателя не меняется.`,
        backHome: 'На главную'
      }
    : {
        home: 'KI-Geschenkfinder',
        guides: 'Ratgeber',
        startTop: '✨ KI-Finder',
        budgetPill: `💶 Budget: ${page.minPrice}–${page.maxPrice} €`,
        ratingPill: '⭐ Amazon.de 4★+ Filter',
        freshPill: `🔄 Täglich neu (${dayKey.split('-').reverse().join('.')})`,
        amzBtn: 'Auf Amazon.de ansehen *',
        btnAi: '✨ 5 frische Ideen per Live-KI',
        btnShuffle: '🔄 Andere aus der Datenbank',
        aiBoxHead: '✨ Noch genauer? Optional ein Hobby für die Live-KI ergänzen:',
        aiPh: 'z. B. liebt Hunde, Sauna oder Minimalismus...',
        aiGo: 'KI ✨',
        aiLoading: '⏳ Live-KI erstellt 5 frische Geschenkideen...',
        aiDone: '✅ Fertig! 5 neue Live-KI Ideen für dich:',
        aiError: '⚠️ Die Live-KI ist gerade ausgelastet — probiere „Andere aus der Datenbank“ oder versuche es gleich erneut.',
        aiBadge: 'Live-KI ✨',
        shuffleLoading: '⏳ Lade 8 weitere Ideen aus der Datenbank...',
        shuffleDone: '✅ 8 neue Ideen aus der Datenbank geladen.',
        ctaTitle: 'Alter, Budget oder Anlass anpassen?',
        ctaText: 'Öffne unseren interaktiven KI-Geschenkfinder — alle Filter dieser Seite sind schon voreingestellt.',
        ctaBtn: '⚙️ Alle Filter im KI-Finder öffnen',
        faqHead: 'Häufige Fragen',
        moreHead: 'Weitere beliebte Geschenk-Ratgeber',
        allGuides: '📚 Alle 20 Ratgeber →',
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

  const clientCfg = {
    lang: page.lang,
    group: page.group,
    gender: page.gender,
    age: page.age,
    relation: page.relation,
    occasion: page.occasion,
    hobbies: page.hobbies || [],
    budget: page.budget,
    minPrice: page.minPrice,
    maxPrice: page.maxPrice,
    keywords: page.keywords || [],
    aiPrompt: page.aiPrompt || page.h1,
    initialIds: items.map(i => i.id),
    tag: AFFILIATE_TAG,
    txt: {
      amzBtn: labels.amzBtn,
      aiLoading: labels.aiLoading,
      aiDone: labels.aiDone,
      aiError: labels.aiError,
      aiBadge: labels.aiBadge,
      shuffleLoading: labels.shuffleLoading,
      shuffleDone: labels.shuffleDone
    }
  };

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
      <span class="pill">${labels.freshPill}</span>
    </div>

    <section class="grid" id="base-gift-list" aria-label="Geschenkideen">
      ${giftCardsHtml}
    </section>

    <div class="action-bar">
      <button type="button" class="act-primary" id="btn-live-ai">${labels.btnAi}</button>
      <button type="button" class="act-secondary" id="btn-shuffle-db">${labels.btnShuffle}</button>
    </div>

    <section class="ai-panel" aria-label="Live-KI">
      <div class="ai-panel-head">${labels.aiBoxHead}</div>
      <div class="ai-input-row">
        <input type="text" class="ai-input" id="ai-hint-input" maxlength="140" placeholder="${escapeHtml(labels.aiPh)}" />
        <button type="button" class="ai-send" id="btn-live-ai-send">${labels.aiGo}</button>
      </div>
      <div class="ai-status" id="ai-status"></div>
      <div class="ai-results-wrap" id="ai-results" style="display:none"></div>
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
        <a class="rel-chip" href="/geschenke">${labels.allGuides}</a>
      </div>
    </section>

    <footer>
      <div>${labels.disclosure}</div>
      <div style="margin-top:8px"><a href="/">${labels.backHome}</a> · <a href="/geschenke">${labels.guides}</a> · <a href="/impressum" rel="nofollow">Impressum</a> · <a href="/datenschutz" rel="nofollow">Datenschutz</a></div>
    </footer>
  </main>

  <script>
    (function () {
      var CFG = ${safeJsonLd(clientCfg)};
      var STOP = ${safeJsonLd(Array.from(STOP_WORDS))};
      var stopSet = new Set(STOP);
      var shownIds = new Set(CFG.initialIds || []);
      var cachedDb = null;

      function esc(s) {
        return String(s || '').replace(/[&<>"']/g, function (m) {
          return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
        });
      }

      function amzUrl(q) {
        var cleanQ = String(q || 'Geschenkidee').replace(/bestseller/gi, '').trim();
        var p = new URLSearchParams({
          k: cleanQ,
          'low-price': String(CFG.minPrice),
          'high-price': String(CFG.maxPrice),
          rh: 'p_72:419117031',
          tag: CFG.tag
        });
        return 'https://www.amazon.de/s?' + p.toString();
      }

      function renderCard(item, isAi) {
        var title = typeof item.title === 'object' ? (item.title[CFG.lang] || item.title.de || item.query) : item.title;
        var reason = typeof item.reason === 'object' ? (item.reason[CFG.lang] || item.reason.de || '') : item.reason;
        var badge = isAi ? '<span class="ai-pill">' + esc(CFG.txt.aiBadge) + '</span>' : '';
        return '<article class="card' + (isAi ? ' ai-card' : '') + '">' +
          '<div class="gift-row">' +
            '<div class="ico" aria-hidden="true">' + esc(item.emoji || '🎁') + '</div>' +
            '<div style="flex:1;min-width:0">' +
              badge +
              '<h2 class="gift-h2">' + esc(title) + '</h2>' +
              '<p class="gift-p">' + esc(reason) + '</p>' +
            '</div>' +
          '</div>' +
          '<a class="amz-btn" href="' + amzUrl(item.query || title) + '" target="_blank" rel="noopener noreferrer sponsored">🛒 ' + esc(CFG.txt.amzBtn) + '</a>' +
        '</article>';
      }

      function tokens(text) {
        return String(text || '').toLowerCase().replace(/[^a-zäöüßа-яё0-9]+/gi, ' ').split(' ')
          .filter(function (w) { return w.length >= 5 && !stopSet.has(w); });
      }

      function isDup(cand, list) {
        var cR = String((cand.reason && cand.reason.de) || '').toLowerCase().trim();
        var cW = new Set(tokens(((cand.title && cand.title.de) || '') + ' ' + (cand.query || '')));
        for (var i = 0; i < list.length; i++) {
          var prev = list[i];
          if (cand.id === prev.id) return true;
          var pR = String((prev.reason && prev.reason.de) || '').toLowerCase().trim();
          if (cR && pR && cR === pR) return true;
          var pW = tokens(((prev.title && prev.title.de) || '') + ' ' + (prev.query || ''));
          var shared = 0;
          for (var j = 0; j < pW.length; j++) {
            if (cW.has(pW[j])) {
              if (pW[j].length >= 7) return true;
              shared++;
            }
          }
          if (shared >= 2) return true;
        }
        return false;
      }

      async function runLiveAi() {
        var btn1 = document.getElementById('btn-live-ai');
        var btn2 = document.getElementById('btn-live-ai-send');
        var status = document.getElementById('ai-status');
        var out = document.getElementById('ai-results');
        var extra = (document.getElementById('ai-hint-input').value || '').trim();
        var promptText = extra ? (CFG.aiPrompt + '. Besonderer Wunsch: ' + extra) : CFG.aiPrompt;

        btn1.disabled = true;
        btn2.disabled = true;
        status.textContent = CFG.txt.aiLoading;

        try {
          var res = await fetch('/api/suggest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lang: CFG.lang,
              gender: CFG.gender,
              age: CFG.age,
              relation: CFG.relation,
              occasion: CFG.occasion,
              hobbies: CFG.hobbies,
              minBudget: CFG.minPrice,
              maxBudget: CFG.maxPrice,
              prompt: promptText
            })
          });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          var data = await res.json();
          if (!Array.isArray(data.items) || !data.items.length) throw new Error('Empty');
          out.innerHTML = data.items.map(function (it) { return renderCard(it, true); }).join('');
          out.style.display = 'grid';
          status.textContent = CFG.txt.aiDone;
          out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (err) {
          status.textContent = CFG.txt.aiError;
        } finally {
          btn1.disabled = false;
          btn2.disabled = false;
        }
      }

      async function shuffleFromDb() {
        var btn = document.getElementById('btn-shuffle-db');
        var status = document.getElementById('ai-status');
        var listEl = document.getElementById('base-gift-list');
        btn.disabled = true;
        status.textContent = CFG.txt.shuffleLoading;

        try {
          if (!cachedDb) {
            var res = await fetch('/gifts.json');
            if (!res.ok) throw new Error('DB load failed');
            cachedDb = await res.json();
          }
          var isMinor = CFG.age < 18;
          var isHobby = CFG.group === 'Hobby';
          var pool = cachedDb.filter(function (item) {
            if (isMinor && item.adultOnly) return false;
            if (CFG.age < (item.minAge || 0) - 3 || CFG.age > (item.maxAge || 99) + 6) return false;
            if (CFG.gender !== 'all' && item.gender && item.gender !== 'all' && item.gender !== CFG.gender) return false;
            return true;
          });
          if (pool.length < 16) pool = cachedDb.filter(function (i) { return !(isMinor && i.adultOnly); });

          var scored = pool.map(function (item) {
            var score = 50;
            var price = Number(item.price) || CFG.budget;
            if (price >= CFG.minPrice && price <= CFG.maxPrice) score += 30;
            else score += Math.max(0, 16 - Math.min(Math.abs(price - CFG.minPrice), Math.abs(price - CFG.maxPrice)) * 0.7);
            if (Array.isArray(item.relations) && item.relations.indexOf(CFG.relation) !== -1) score += 12;
            if (Array.isArray(item.occasions) && item.occasions.indexOf(CFG.occasion) !== -1) score += 14;
            if (Array.isArray(CFG.hobbies) && Array.isArray(item.hobbies)) {
              var hits = 0;
              CFG.hobbies.forEach(function (h) { if (item.hobbies.indexOf(h) !== -1) hits++; });
              score += isHobby ? hits * 32 : Math.min(20, hits * 12);
            }
            if (shownIds.has(item.id)) score -= 35;
            score += Math.random() * 28;
            return { item: item, score: score };
          });

          scored.sort(function (a, b) { return b.score - a.score; });

          var chosen = [];
          var hCounts = {};
          var maxH = isHobby ? 8 : 2;
          for (var i = 0; i < scored.length && chosen.length < 8; i++) {
            var it = scored[i].item;
            if (isDup(it, chosen)) continue;
            var ph = (Array.isArray(it.hobbies) && it.hobbies[0]) || 'other';
            if ((hCounts[ph] || 0) >= maxH) continue;
            chosen.push(it);
            hCounts[ph] = (hCounts[ph] || 0) + 1;
          }
          if (chosen.length < 8) {
            for (var j = 0; j < scored.length && chosen.length < 8; j++) {
              if (!isDup(scored[j].item, chosen)) chosen.push(scored[j].item);
            }
          }

          if (shownIds.size > 40) shownIds.clear();
          chosen.forEach(function (x) { shownIds.add(x.id); });

          listEl.innerHTML = chosen.map(function (it) { return renderCard(it, false); }).join('');
          status.textContent = CFG.txt.shuffleDone;
          listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (err) {
          status.textContent = CFG.txt.aiError;
        } finally {
          btn.disabled = false;
        }
      }

      document.getElementById('btn-live-ai').addEventListener('click', runLiveAi);
      document.getElementById('btn-live-ai-send').addEventListener('click', runLiveAi);
      document.getElementById('btn-shuffle-db').addEventListener('click', shuffleFromDb);
      document.getElementById('ai-hint-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          runLiveAi();
        }
      });
    })();
  </script>
</body>
</html>`;
}

export default async function handler(req, res) {
  const slug = String(req.query?.slug || '').trim().toLowerCase();
  const now = new Date();
  const dayKey = now.toISOString().slice(0, 10);
  const nextMidnightUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0);
  const ttlSeconds = Math.max(300, Math.min(86400, Math.floor((nextMidnightUtc - now.getTime()) / 1000)));

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', `public, s-maxage=${ttlSeconds}, stale-while-revalidate=3600`);

  if (!slug) {
    return res.status(200).send(renderHubHtml());
  }

  const page = PAGES.find(p => p.slug === slug);
  if (!page) {
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    return res.status(404).send(renderHubHtml());
  }

  const gifts = await loadGifts();
  const items = selectGifts(gifts, page, dayKey);
  return res.status(200).send(renderGuideHtml(page, items, dayKey));
}

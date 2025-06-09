import localeList from '@/locales/index.json';

export function collectTranslationNamespaces(): string[] {
  const namespaces = new Set<string>();
  // Default NS
  namespaces.add('common');

  // 1. glob all json file 
  const allPageFiles = import.meta.glob(
    '@/locales/*/pages/*.json', 
    { eager: true }
  );

  const allComponentFiles = import.meta.glob(
    '@/locales/*/components/*.json', 
    { eager: true }
  );


  function parsePath(
  filePath: string
  ): 
  | {
      lang: string;
      category: 'pages' | 'components';
      key: string;
    }
  | null 
  {

    const segments = filePath.split('/');
    
    if (segments.length !== 6) return null; // Incorrect path

    // Seperate segments to parts
    const lang = segments[3];
    const category = segments[4] as 'pages' | 'components';
    const fileName = segments[5];
    if (!fileName.endsWith('.json')) return null; // Only json is allowed
    const key = fileName.replace('.json', '');
    return { lang, category, key };
  }

  // Process page files
  for (const filePath in allPageFiles) {
    const info = parsePath(filePath);
    if (!info) continue;
    const { lang, category, key } = info;
    if (localeList.languages.includes(lang)) {
      namespaces.add(`${category}/${key}`); // example: 'pages/home'
    }
  }

  // Process component files
  for (const filePath in allComponentFiles) {
    const info = parsePath(filePath);
    if (!info) continue;
    const { lang, category, key } = info;
    if (localeList.languages.includes(lang)) {
      namespaces.add(`${category}/${key}`); // example: 'components/header'
    }
  }

  return Array.from(namespaces);
}

import { rtlLanguages, languageMetadata } from '../i18nConfig';

/**
 * Apply RTL styles to the document
 */
export const applyRTLStyles = (isRTL) => {
  const root = document.documentElement;
  
  if (isRTL) {
    root.style.setProperty('--text-align-start', 'right');
    root.style.setProperty('--text-align-end', 'left');
    root.style.setProperty('--float-start', 'right');
    root.style.setProperty('--float-end', 'left');
    root.style.setProperty('--margin-start', 'margin-right');
    root.style.setProperty('--margin-end', 'margin-left');
    root.style.setProperty('--padding-start', 'padding-right');
    root.style.setProperty('--padding-end', 'padding-left');
    root.style.setProperty('--border-start', 'border-right');
    root.style.setProperty('--border-end', 'border-left');
  } else {
    root.style.setProperty('--text-align-start', 'left');
    root.style.setProperty('--text-align-end', 'right');
    root.style.setProperty('--float-start', 'left');
    root.style.setProperty('--float-end', 'right');
    root.style.setProperty('--margin-start', 'margin-left');
    root.style.setProperty('--margin-end', 'margin-right');
    root.style.setProperty('--padding-start', 'padding-left');
    root.style.setProperty('--padding-end', 'padding-right');
    root.style.setProperty('--border-start', 'border-left');
    root.style.setProperty('--border-end', 'border-right');
  }
};

/**
 * Get localized number formatting options
 */
export const getLocalizedNumberOptions = (language, type = 'decimal') => {
  const options = {
    decimal: { style: 'decimal' },
    currency: { style: 'currency', currency: 'USD' },
    percent: { style: 'percent' },
    compact: { notation: 'compact' }
  };

  return {
    ...options[type],
    minimumFractionDigits: type === 'currency' ? 2 : 0,
    maximumFractionDigits: type === 'currency' ? 2 : 2
  };
};

/**
 * Format file size in a localized way
 */
export const formatFileSize = (bytes, language = 'en') => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const formatter = new Intl.NumberFormat(language, {
    minimumFractionDigits: unitIndex === 0 ? 0 : 1,
    maximumFractionDigits: unitIndex === 0 ? 0 : 1
  });

  return `${formatter.format(size)} ${units[unitIndex]}`;
};

/**
 * Format duration in a localized way
 */
export const formatDuration = (milliseconds, language = 'en') => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ms = milliseconds % 1000;

  const parts = [];
  
  if (hours > 0) {
    parts.push(`${hours.toString().padStart(2, '0')}`);
  }
  
  parts.push(`${minutes.toString().padStart(2, '0')}`);
  parts.push(`${seconds.toString().padStart(2, '0')}`);
  
  if (ms > 0) {
    parts.push(`.${ms.toString().padStart(3, '0')}`);
  }

  return parts.join('');
};

/**
 * Get plural form based on language rules
 */
export const getPluralForm = (count, language = 'en') => {
  // Simplified plural rules - in a real app, you'd use a library like intl-pluralrules
  const pluralRules = {
    'ar': (n) => {
      if (n === 0) return 'zero';
      if (n === 1) return 'one';
      if (n === 2) return 'two';
      if (n % 100 >= 3 && n % 100 <= 10) return 'few';
      if (n % 100 >= 11 && n % 100 <= 99) return 'many';
      return 'other';
    },
    'zh': () => 'other', // Chinese doesn't have plurals
    'ja': () => 'other', // Japanese doesn't have plurals
    'ko': () => 'other', // Korean doesn't have plurals
    'th': () => 'other', // Thai doesn't have plurals
    'vi': () => 'other', // Vietnamese doesn't have plurals
    'tr': () => 'other', // Turkish doesn't have plurals
    'default': (n) => (n === 1 ? 'one' : 'other')
  };

  const rule = pluralRules[language] || pluralRules['default'];
  return rule(count);
};

/**
 * Sort languages alphabetically by native name
 */
export const sortLanguages = (languages, sortBy = 'nativeName') => {
  return [...languages].sort((a, b) => {
    const aValue = a[sortBy] || '';
    const bValue = b[sortBy] || '';
    return aValue.localeCompare(bValue);
  });
};

/**
 * Filter languages by region or script
 */
export const filterLanguages = (languages, filters = {}) => {
  return languages.filter(language => {
    if (filters.rtl && language.dir !== 'rtl') return false;
    if (filters.ltr && language.dir !== 'ltr') return false;
    if (filters.region && !language.name.toLowerCase().includes(filters.region.toLowerCase())) {
      return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        language.name.toLowerCase().includes(searchLower) ||
        language.nativeName.toLowerCase().includes(searchLower) ||
        language.code.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
};

/**
 * Get language family/group information
 */
export const getLanguageFamily = (languageCode) => {
  const families = {
    // Romance languages
    romance: ['es', 'fr', 'pt', 'it', 'ro', 'ca', 'gl'],
    // Germanic languages
    germanic: ['en', 'de', 'nl', 'sv', 'da', 'no', 'is', 'fo', 'af'],
    // Slavic languages
    slavic: ['ru', 'pl', 'cs', 'sk', 'bg', 'hr', 'sr', 'sl', 'uk', 'be'],
    // Indo-Aryan languages
    indo_aryan: ['hi', 'bn', 'ur', 'pa', 'gu', 'ta', 'te', 'ml', 'kn', 'or'],
    // Sinitic languages
    sinitic: ['zh', 'zh-TW'],
    // Japonic languages
    japonic: ['ja'],
    // Koreanic languages
    koreanic: ['ko'],
    // Turkic languages
    turkic: ['tr', 'az', 'kk', 'uz', 'ky', 'tk', 'ug'],
    // Semitic languages
    semitic: ['ar', 'he'],
    // Other
    other: []
  };

  for (const [family, languages] of Object.entries(families)) {
    if (languages.includes(languageCode)) {
      return family;
    }
  }
  
  return 'other';
};

/**
 * Create language groups for better organization
 */
export const createLanguageGroups = (languages) => {
  const groups = {
    popular: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'pt', 'ru'],
    european: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'el', 'cs', 'hu', 'ro', 'bg', 'hr', 'sr', 'sl', 'sk', 'et', 'lv', 'lt', 'uk', 'be'],
    asian: ['zh', 'zh-TW', 'ja', 'ko', 'th', 'vi', 'id', 'ms', 'fil', 'hi', 'bn', 'ur', 'ta', 'te', 'ml', 'kn', 'gu', 'pa', 'or'],
    middle_eastern: ['ar', 'he', 'fa', 'tr', 'az', 'kk', 'uz', 'ky', 'tk', 'ug'],
    african: ['af', 'sw', 'zu', 'ha', 'yo', 'ig', 'am', 'om', 'so', 'ti'],
    americas: ['en', 'es', 'pt', 'fr'],
    oceanic: ['en']
  };

  const grouped = {};
  
  Object.entries(groups).forEach(([groupName, groupLanguages]) => {
    grouped[groupName] = languages.filter(lang => 
      groupLanguages.includes(lang.code)
    );
  });

  // Add "other" group for languages not in any group
  const groupedCodes = Object.values(groups).flat();
  grouped.other = languages.filter(lang => !groupedCodes.includes(lang.code));

  return grouped;
};

/**
 * Detect if user prefers RTL based on system settings
 */
export const detectSystemRTL = () => {
  // Check if system language is RTL
  const systemLang = navigator.language || navigator.userLanguage;
  const langCode = systemLang.split('-')[0];
  return rtlLanguages.includes(langCode);
};

/**
 * Get optimal text direction for mixed content
 */
export const getOptimalDirection = (text, fallbackLanguage = 'en') => {
  // Simple RTL detection based on character ranges
  const rtlRegex = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  
  if (rtlRegex.test(text)) {
    return 'rtl';
  }
  
  return languageMetadata[fallbackLanguage]?.dir || 'ltr';
};

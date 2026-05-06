import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// RTL languages configuration
const rtlLanguages = ['ar', 'he', 'fa', 'ur', 'ku', 'ps'];

// Language metadata with proper names and directions
const languageMetadata = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  es: { name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  fr: { name: 'French', nativeName: 'Français', dir: 'ltr' },
  de: { name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  ja: { name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  zh: { name: 'Chinese (Simplified)', nativeName: '简体中文', dir: 'ltr' },
  'zh-TW': { name: 'Chinese (Traditional)', nativeName: '繁體中文', dir: 'ltr' },
  pt: { name: 'Portuguese', nativeName: 'Português', dir: 'ltr' },
  ru: { name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  it: { name: 'Italian', nativeName: 'Italiano', dir: 'ltr' },
  nl: { name: 'Dutch', nativeName: 'Nederlands', dir: 'ltr' },
  pl: { name: 'Polish', nativeName: 'Polski', dir: 'ltr' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  ko: { name: 'Korean', nativeName: '한국어', dir: 'ltr' },
  th: { name: 'Thai', nativeName: 'ไทย', dir: 'ltr' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', dir: 'ltr' },
  id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr' },
  ms: { name: 'Malay', nativeName: 'Bahasa Melayu', dir: 'ltr' },
  fil: { name: 'Filipino', nativeName: 'Filipino', dir: 'ltr' },
  he: { name: 'Hebrew', nativeName: 'עברית', dir: 'rtl' },
  sv: { name: 'Swedish', nativeName: 'Svenska', dir: 'ltr' },
  da: { name: 'Danish', nativeName: 'Dansk', dir: 'ltr' },
  no: { name: 'Norwegian', nativeName: 'Norsk', dir: 'ltr' },
  fi: { name: 'Finnish', nativeName: 'Suomi', dir: 'ltr' },
  el: { name: 'Greek', nativeName: 'Ελληνικά', dir: 'ltr' },
  cs: { name: 'Czech', nativeName: 'Čeština', dir: 'ltr' },
  hu: { name: 'Hungarian', nativeName: 'Magyar', dir: 'ltr' },
  ro: { name: 'Romanian', nativeName: 'Română', dir: 'ltr' },
  bg: { name: 'Bulgarian', nativeName: 'Български', dir: 'ltr' },
  hr: { name: 'Croatian', nativeName: 'Hrvatski', dir: 'ltr' },
  sr: { name: 'Serbian', nativeName: 'Српски', dir: 'ltr' },
  sl: { name: 'Slovenian', nativeName: 'Slovenščina', dir: 'ltr' },
  sk: { name: 'Slovak', nativeName: 'Slovenčina', dir: 'ltr' },
  et: { name: 'Estonian', nativeName: 'Eesti', dir: 'ltr' },
  lv: { name: 'Latvian', nativeName: 'Latviešu', dir: 'ltr' },
  lt: { name: 'Lithuanian', nativeName: 'Lietuvių', dir: 'ltr' },
  uk: { name: 'Ukrainian', nativeName: 'Українська', dir: 'ltr' },
  be: { name: 'Belarusian', nativeName: 'Беларуская', dir: 'ltr' },
  kk: { name: 'Kazakh', nativeName: 'Қазақша', dir: 'ltr' },
  uz: { name: 'Uzbek', nativeName: 'Oʻzbekcha', dir: 'ltr' },
  az: { name: 'Azerbaijani', nativeName: 'Azərbaycanca', dir: 'ltr' },
  ka: { name: 'Georgian', nativeName: 'ქართული', dir: 'ltr' },
  hy: { name: 'Armenian', nativeName: 'Հայերեն', dir: 'ltr' },
  mk: { name: 'Macedonian', nativeName: 'Македонски', dir: 'ltr' },
  sq: { name: 'Albanian', nativeName: 'Shqip', dir: 'ltr' },
  mt: { name: 'Maltese', nativeName: 'Malti', dir: 'ltr' },
  cy: { name: 'Welsh', nativeName: 'Cymraeg', dir: 'ltr' },
  ga: { name: 'Irish', nativeName: 'Gaeilge', dir: 'ltr' },
  gd: { name: 'Scottish Gaelic', nativeName: 'Gàidhlig', dir: 'ltr' },
  is: { name: 'Icelandic', nativeName: 'Íslenska', dir: 'ltr' },
  fo: { name: 'Faroese', nativeName: 'Føroyskt', dir: 'ltr' },
  eu: { name: 'Basque', nativeName: 'Euskara', dir: 'ltr' },
  ca: { name: 'Catalan', nativeName: 'Català', dir: 'ltr' },
  gl: { name: 'Galician', nativeName: 'Galego', dir: 'ltr' },
  af: { name: 'Afrikaans', nativeName: 'Afrikaans', dir: 'ltr' },
  sw: { name: 'Swahili', nativeName: 'Kiswahili', dir: 'ltr' },
  zu: { name: 'Zulu', nativeName: 'IsiZulu', dir: 'ltr' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', dir: 'ltr' }
};

// Export language utilities
export { rtlLanguages, languageMetadata };
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import frTranslation from './locales/fr.json';
import deTranslation from './locales/de.json';
import jaTranslation from './locales/ja.json';
import zhTranslation from './locales/zh.json';
import ptTranslation from './locales/pt.json';
import ruTranslation from './locales/ru.json';
import itTranslation from './locales/it.json';
import nlTranslation from './locales/nl.json';
import plTranslation from './locales/pl.json';
import trTranslation from './locales/tr.json';
import arTranslation from './locales/ar.json';
import hiTranslation from './locales/hi.json';
import koTranslation from './locales/ko.json';
import thTranslation from './locales/th.json';
import viTranslation from './locales/vi.json';
import idTranslation from './locales/id.json';
import msTranslation from './locales/ms.json';
import filTranslation from './locales/fil.json';
import zhTWTranslation from './locales/zh-TW.json';
import heTranslation from './locales/he.json';
import svTranslation from './locales/sv.json';
import daTranslation from './locales/da.json';
import noTranslation from './locales/no.json';
import fiTranslation from './locales/fi.json';
import elTranslation from './locales/el.json';
import csTranslation from './locales/cs.json';
import huTranslation from './locales/hu.json';
import roTranslation from './locales/ro.json';
import bgTranslation from './locales/bg.json';
import hrTranslation from './locales/hr.json';
import srTranslation from './locales/sr.json';
import slTranslation from './locales/sl.json';
import skTranslation from './locales/sk.json';
import etTranslation from './locales/et.json';
import lvTranslation from './locales/lv.json';
import ltTranslation from './locales/lt.json';
import ukTranslation from './locales/uk.json';
import beTranslation from './locales/be.json';
import kkTranslation from './locales/kk.json';
import uzTranslation from './locales/uz.json';
import azTranslation from './locales/az.json';
import kaTranslation from './locales/ka.json';
import hyTranslation from './locales/hy.json';
import mkTranslation from './locales/mk.json';
import sqTranslation from './locales/sq.json';
import mtTranslation from './locales/mt.json';
import cyTranslation from './locales/cy.json';
import gaTranslation from './locales/ga.json';
import gdTranslation from './locales/gd.json';
import isTranslation from './locales/is.json';
import foTranslation from './locales/fo.json';
import euTranslation from './locales/eu.json';
import caTranslation from './locales/ca.json';
import glTranslation from './locales/gl.json';
import afTranslation from './locales/af.json';
import swTranslation from './locales/sw.json';
import zuTranslation from './locales/zu.json';
import bnTranslation from './locales/bn.json';

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  ja: { translation: jaTranslation },
  zh: { translation: zhTranslation },
  pt: { translation: ptTranslation },
  ru: { translation: ruTranslation },
  it: { translation: itTranslation },
  nl: { translation: nlTranslation },
  pl: { translation: plTranslation },
  tr: { translation: trTranslation },
  ar: { translation: arTranslation },
  hi: { translation: hiTranslation },
  ko: { translation: koTranslation },
  th: { translation: thTranslation },
  vi: { translation: viTranslation },
  id: { translation: idTranslation },
  ms: { translation: msTranslation },
  fil: { translation: filTranslation },
  'zh-TW': { translation: zhTWTranslation },
  he: { translation: heTranslation },
  sv: { translation: svTranslation },
  da: { translation: daTranslation },
  no: { translation: noTranslation },
  fi: { translation: fiTranslation },
  el: { translation: elTranslation },
  cs: { translation: csTranslation },
  hu: { translation: huTranslation },
  ro: { translation: roTranslation },
  bg: { translation: bgTranslation },
  hr: { translation: hrTranslation },
  sr: { translation: srTranslation },
  sl: { translation: slTranslation },
  sk: { translation: skTranslation },
  et: { translation: etTranslation },
  lv: { translation: lvTranslation },
  lt: { translation: ltTranslation },
  uk: { translation: ukTranslation },
  be: { translation: beTranslation },
  kk: { translation: kkTranslation },
  uz: { translation: uzTranslation },
  az: { translation: azTranslation },
  ka: { translation: kaTranslation },
  hy: { translation: hyTranslation },
  mk: { translation: mkTranslation },
  sq: { translation: sqTranslation },
  mt: { translation: mtTranslation },
  cy: { translation: cyTranslation },
  ga: { translation: gaTranslation },
  gd: { translation: gdTranslation },
  is: { translation: isTranslation },
  fo: { translation: foTranslation },
  eu: { translation: euTranslation },
  ca: { translation: caTranslation },
  gl: { translation: glTranslation },
  af: { translation: afTranslation },
  sw: { translation: swTranslation },
  zu: { translation: zuTranslation },
  bn: { translation: bnTranslation }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes
      format: function(value, format, lng) {
        if (format === 'uppercase') {
          return value.toUpperCase();
        }
        if (format === 'lowercase') {
          return value.toLowerCase();
        }
        if (format === 'capitalize') {
          return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
      }
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
      checkWhitelist: true
    },
    
    whitelist: Object.keys(resources),
    
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span']
    },
    
    missingKeyHandler: (lng, ns, key) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${key} for language: ${lng}`);
      }
    },
    
    saveMissing: process.env.NODE_ENV === 'development',
    saveMissingTo: 'current',
    
    // Number and date formatting
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false
  });

// Language switching utility functions
export const changeLanguage = (lng) => {
  return i18n.changeLanguage(lng).then(() => {
    // Update document direction for RTL languages
    const isRTL = rtlLanguages.includes(lng);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    
    // Store language preference
    localStorage.setItem('i18nextLng', lng);
    
    // Update document title
    const titleKey = 'app.title';
    if (i18n.exists(titleKey)) {
      document.title = i18n.t(titleKey);
    }
    
    return lng;
  });
};

// Get current language direction
export const getLanguageDirection = (lng = i18n.language) => {
  return languageMetadata[lng]?.dir || 'ltr';
};

// Check if language is RTL
export const isRTL = (lng = i18n.language) => {
  return rtlLanguages.includes(lng);
};

// Get available languages with metadata
export const getAvailableLanguages = () => {
  return Object.keys(languageMetadata).map(key => ({
    code: key,
    ...languageMetadata[key]
  }));
};

// Format numbers based on locale
export const formatNumber = (number, options = {}) => {
  try {
    return new Intl.NumberFormat(i18n.language, options).format(number);
  } catch (error) {
    console.warn('Number formatting failed:', error);
    return number.toString();
  }
};

// Format dates based on locale
export const formatDate = (date, options = {}) => {
  try {
    return new Intl.DateTimeFormat(i18n.language, options).format(date);
  } catch (error) {
    console.warn('Date formatting failed:', error);
    return date.toString();
  }
};

// Format time based on locale
export const formatTime = (date, options = {}) => {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    ...options
  };
  
  try {
    return new Intl.DateTimeFormat(i18n.language, defaultOptions).format(date);
  } catch (error) {
    console.warn('Time formatting failed:', error);
    return date.toString();
  }
};

// Auto-detect and set language on load
export const initializeLanguage = () => {
  const savedLanguage = localStorage.getItem('i18nextLng');
  const browserLanguage = navigator.language || navigator.languages?.[0];
  
  // Try saved language first
  if (savedLanguage && languageMetadata[savedLanguage]) {
    changeLanguage(savedLanguage);
    return;
  }
  
  // Try browser language
  if (browserLanguage) {
    const languageCode = browserLanguage.split('-')[0];
    const exactMatch = languageMetadata[browserLanguage];
    const languageMatch = languageMetadata[languageCode];
    
    if (exactMatch) {
      changeLanguage(browserLanguage);
    } else if (languageMatch) {
      changeLanguage(languageCode);
    } else {
      changeLanguage('en'); // fallback to English
    }
  } else {
    changeLanguage('en'); // fallback to English
  }
};

// Initialize language on import
initializeLanguage();

export default i18n;

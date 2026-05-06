import { useTranslation } from 'react-i18next';
import { 
  getLanguageDirection, 
  isRTL, 
  formatNumber, 
  formatDate, 
  formatTime,
  changeLanguage,
  getAvailableLanguages
} from '../i18nConfig';

export const useLanguage = () => {
  const { t, i18n, ready } = useTranslation();

  return {
    // Translation function
    t,
    
    // Current language state
    currentLanguage: i18n.language,
    isReady: ready,
    
    // Language utilities
    direction: getLanguageDirection(i18n.language),
    isRTL: isRTL(i18n.language),
    
    // Formatting functions
    formatNumber: (number, options) => formatNumber(number, options),
    formatDate: (date, options) => formatDate(date, options),
    formatTime: (date, options) => formatTime(date, options),
    
    // Language switching
    changeLanguage: (lng) => changeLanguage(lng),
    
    // Available languages
    availableLanguages: getAvailableLanguages(),
    
    // Language detection
    detectedLanguage: i18n.detectedLanguage || i18n.language,
    
    // Check if translation key exists
    exists: (key) => i18n.exists(key),
    
    // Get all translation keys for current namespace
    getResource: (lng, ns) => i18n.getResourceBundle(lng || i18n.language, ns || 'translation'),
    
    // Add dynamic translation
    addResource: (lng, ns, key, value) => i18n.addResource(lng, ns, key, value),
    
    // Get language specific info
    getLanguageInfo: () => {
      const languages = getAvailableLanguages();
      return languages.find(lang => lang.code === i18n.language) || 
             languages.find(lang => lang.code === 'en');
    }
  };
};

export default useLanguage;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  changeLanguage, 
  getAvailableLanguages, 
  getLanguageDirection, 
  isRTL 
} from '../i18nConfig';

const LanguageSelector = ({ 
  className = '', 
  showFlag = true, 
  showNativeName = true,
  compact = false 
}) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const availableLanguages = getAvailableLanguages();

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const handleLanguageSelect = async (languageCode) => {
    try {
      await changeLanguage(languageCode);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const getCurrentLanguageInfo = () => {
    return availableLanguages.find(lang => lang.code === currentLanguage) || 
           availableLanguages.find(lang => lang.code === 'en');
  };

  const currentLangInfo = getCurrentLanguageInfo();

  // Flag emojis for common languages
  const getFlagEmoji = (languageCode) => {
    const flags = {
      'en': '🇺🇸', 'es': '🇪🇸', 'fr': '🇫🇷', 'de': '🇩🇪', 'ja': '🇯🇵',
      'zh': '🇨🇳', 'zh-TW': '🇹🇼', 'pt': '🇵🇹', 'ru': '🇷🇺', 'it': '🇮🇹',
      'nl': '🇳🇱', 'pl': '🇵🇱', 'tr': '🇹🇷', 'ar': '🇸🇦', 'hi': '🇮🇳',
      'ko': '🇰🇷', 'th': '🇹🇭', 'vi': '🇻🇳', 'id': '🇮🇩', 'ms': '🇲🇾',
      'fil': '🇵🇭', 'he': '🇮🇱', 'sv': '🇸🇪', 'da': '🇩🇰', 'no': '🇳🇴',
      'fi': '🇫🇮', 'el': '🇬🇷', 'cs': '🇨🇿', 'hu': '🇭🇺', 'ro': '🇷🇴',
      'bg': '🇧🇬', 'hr': '🇭🇷', 'sr': '🇷🇸', 'sl': '🇸🇮', 'sk': '🇸🇰',
      'et': '🇪🇪', 'lv': '🇱🇻', 'lt': '🇱🇹', 'uk': '🇺🇦', 'be': '🇧🇾',
      'kk': '🇰🇿', 'uz': '🇺🇿', 'az': '🇦🇿', 'ka': '🇬🇪', 'hy': '🇦🇲',
      'mk': '🇲🇰', 'sq': '🇦🇱', 'mt': '🇲🇹', 'cy': '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'ga': '🇮🇪',
      'gd': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'is': '🇮🇸', 'fo': '🇫🇴', 'eu': '🏴󠁥󠁳󠁰󠁶󠁿', 'ca': '🏴󠁥󠁳󠁣󠁴󠁿',
      'gl': '🏴󠁥󠁳󠁣󠁴󠁿', 'af': '🇿🇦', 'sw': '🇰🇪', 'zu': '🇿🇦', 'bn': '🇧🇩'
    };
    return flags[languageCode] || '🌐';
  };

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={t('settings.language')}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {showFlag && <span>{getFlagEmoji(currentLanguage)}</span>}
          <span>{currentLangInfo.nativeName}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto">
            <div className="py-1" role="listbox">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                    language.code === currentLanguage ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                  role="option"
                  aria-selected={language.code === currentLanguage}
                >
                  {showFlag && <span>{getFlagEmoji(language.code)}</span>}
                  <span>{language.nativeName}</span>
                  {language.code === currentLanguage && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        aria-label={t('settings.language')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {showFlag && (
          <span className="text-lg" role="img" aria-label="Language flag">
            {getFlagEmoji(currentLanguage)}
          </span>
        )}
        <div className="flex flex-col items-start">
          <span className="font-medium">{currentLangInfo.nativeName}</span>
          {showNativeName && currentLangInfo.name !== currentLangInfo.nativeName && (
            <span className="text-xs text-gray-500">{currentLangInfo.name}</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="py-2" role="listbox">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
                  language.code === currentLanguage ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                role="option"
                aria-selected={language.code === currentLanguage}
              >
                {showFlag && (
                  <span className="text-lg" role="img" aria-label={`${language.name} flag`}>
                    {getFlagEmoji(language.code)}
                  </span>
                )}
                <div className="flex flex-col items-start flex-1">
                  <span className="font-medium">{language.nativeName}</span>
                  {showNativeName && language.name !== language.nativeName && (
                    <span className="text-xs text-gray-500">{language.name}</span>
                  )}
                </div>
                {language.code === currentLanguage && (
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

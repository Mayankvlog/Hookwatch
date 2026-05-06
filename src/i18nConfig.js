import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files for 60 languages
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
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false // React already escapes
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;

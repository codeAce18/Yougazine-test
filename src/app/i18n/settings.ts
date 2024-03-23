export const fallbackLng = 'en';
export const languages = [fallbackLng];
export const defaultNS = 'common';

export function getOptions(lang = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

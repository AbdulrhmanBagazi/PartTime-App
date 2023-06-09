import customArabicMessages from './ar'
import customEnglishMessages from './en'
import polyglotI18nProvider from 'ra-i18n-polyglot'

const i18nProvider = polyglotI18nProvider(
  (locale: String) => (locale === 'ar' ? customArabicMessages : customEnglishMessages),
  'ar' // Default locale
)

export default i18nProvider

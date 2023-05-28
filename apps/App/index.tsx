import 'expo-router/entry'
import * as WebBrowser from 'expo-web-browser'
var countries = require('i18n-iso-countries')

WebBrowser.maybeCompleteAuthSession()
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ar.json'))

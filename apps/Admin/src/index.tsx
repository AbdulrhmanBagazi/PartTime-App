import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// import * as Sentry from '@sentry/react'
// import { BrowserTracing } from '@sentry/tracing'
var countries = require('i18n-iso-countries')

// Sentry.init({
//   dsn: 'https://fe039a3302ff47369ad57302e5dea4b8@o239152.ingest.sentry.io/6460199',
//   integrations: [new BrowserTracing()],
//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ar.json'))

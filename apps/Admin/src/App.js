import { useEffect, useState } from 'react'
import { Admin, Resource, Loading, useTranslate, CustomRoutes, Login } from 'react-admin'
import { Route } from 'react-router'
import {
  UserIcon,
  BusinessIcon,
  Festival,
  LocationOn,
  List,
  Work,
  AvTimer,
  Article,
  // CalendarMonth,
} from './theme/icons'
import { MyLayout } from './layout/layout'
import User from './pages/users'
import Comapnies from './pages/companies'
import Events from './pages/events'
import Location from './pages/locations'
import Appsection from './pages/app_section'
import EventJob from './pages/eventjob'
import EventShift from './pages/eventshift'
import Applicants from './pages/applicants'
// import EventDay from './pages/eventday'
import authProvider from './auth/authProvider'
import i18nProvider from './I18n/i18nProvider'
import { dataProvider } from './data/dataProvider'
import Dashboard from './pages/dashboard/Dashboard'
import Configuration from './pages/configuration/Configuration'
//theme
import { lightTheme } from './theme/theme'
import MyError from './layout/MyError'

export default function App() {
  const translate = useTranslate()

  const [isdataProvider, setDataProvider] = useState(() => {})

  useEffect(() => {
    setDataProvider(dataProvider)
  }, [])

  if (!isdataProvider) {
    return <Loading loadingPrimary="app.page.loading" />
  }

  //requireAuth
  return (
    <Admin
      local="en"
      theme={lightTheme}
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
      loginPage={
        <Login
          // A random image that changes everyday
          backgroundImage="https://source.unsplash.com/random/1600x900/daily"
        />
      }
      authProvider={authProvider}
      dataProvider={isdataProvider}
      layout={MyLayout}
      requireAuth>
      <Resource
        options={{ label: translate('app_section') }}
        name="app_section"
        icon={<List />}
        {...Appsection}
      />
      <Resource
        options={{ label: translate('Location') }}
        name="Location"
        icon={<LocationOn />}
        {...Location}
      />
      <Resource options={{ label: translate('Users') }} name="User" icon={<UserIcon />} {...User} />
      <Resource
        options={{ label: translate('Companies') }}
        name="Companies"
        icon={<BusinessIcon />}
        {...Comapnies}
      />
      <Resource options={{ label: translate('Events') }} name="Event" icon={<Festival />} {...Events} />

      <Resource options={{ label: translate('evenjob') }} name="eventjob" icon={<Work />} {...EventJob} />
      <Resource
        options={{ label: translate('eventshift') }}
        name="eventshift"
        icon={<AvTimer />}
        {...EventShift}
      />
      <Resource
        options={{ label: translate('applicants') }}
        name="applicants"
        icon={<Article />}
        {...Applicants}
      />

      {/* <Resource
        options={{ label: translate('eventday') }}
        name="eventday"
        icon={<CalendarMonth />}
        {...EventDay}
      /> */}
      <CustomRoutes>
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/error" element={<MyError />} />
      </CustomRoutes>
    </Admin>
  )
}

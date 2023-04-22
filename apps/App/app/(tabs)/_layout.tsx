import { Tabs } from 'expo-router'
import SettingsButton from '../../components/settingsButton'
import { useI18n } from '../../context/i18n'

export default () => {
  const { I18n } = useI18n()

  return (
    <Tabs initialRouteName="home">
      <Tabs.Screen
        name="home"
        options={{
          title: I18n.Home.Title
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerRight: () => <SettingsButton />,
          title: I18n.Profile.Title
        }}
      />
    </Tabs>
  )
}

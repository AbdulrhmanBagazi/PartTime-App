import { Tabs } from 'expo-router'
import SettingsButton from '../../components/settingsButton'
import { IconButton } from 'react-native-paper'
import { useI18nHook } from '../../hook/i18n'
import { useAuthHook } from '../../hook/auth'

export default () => {
  const I18n = useI18nHook((state) => state.I18n)
  const auth = useAuthHook((state) => state.auth)
  const Direction = useI18nHook((state) => state.Direction)

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        tabBarStyle: {
          borderTopWidth: 0,
          direction: Direction
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = ''
          if (route.name === 'home') {
            iconName = 'home'
          } else if (route.name === 'profile' && auth) {
            iconName = 'account'
          } else if (route.name === 'myJobs') {
            iconName = 'briefcase'
          } else {
            iconName = 'login'
          }
          return (
            <IconButton
              icon={iconName}
              size={size}
              iconColor={color}
              animated
            />
          )
        }
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: I18n.Home.Title
        }}
      />
      <Tabs.Screen
        name="myJobs"
        options={{
          title: I18n.MyJobs.Title
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerLeft: () => <SettingsButton />,
          title: I18n.Profile.Title
        }}
      />
    </Tabs>
  )
}

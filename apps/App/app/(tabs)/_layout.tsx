import { Tabs } from 'expo-router'
import SettingsButton from '../../components/settingsButton'
import { useI18n } from '../../context/i18n'
import { IconButton } from 'react-native-paper'
import { useAuth } from '../../context/auth'

export default () => {
  const { I18n } = useI18n()
  const { auth } = useAuth()

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        tabBarStyle: {
          borderTopWidth: 0
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
          headerRight: () => <SettingsButton />,
          title: I18n.Profile.Title
        }}
      />
    </Tabs>
  )
}

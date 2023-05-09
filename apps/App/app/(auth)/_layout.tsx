import { Stack } from 'expo-router'
import { useI18n } from '../../context/i18n'

export default () => {
  const { I18n } = useI18n()

  return (
    <Stack
      initialRouteName="signin"
      screenOptions={{
        headerShadowVisible: false
      }}
    >
      <Stack.Screen
        name="signin"
        options={{
          title: I18n.SignIn.Title,
          headerShown: false
        }}
      />
    </Stack>
  )
}

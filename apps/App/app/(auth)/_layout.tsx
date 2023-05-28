import { Stack } from 'expo-router'
import { useI18nHook } from '../../hook/i18n'

export default () => {
  const I18n = useI18nHook((state) => state.I18n)

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

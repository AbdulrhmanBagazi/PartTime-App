import 'react-native-gesture-handler'
import { Stack } from 'expo-router'
import { AuthProvider } from '../context/auth'
import { ToggleThemeProvider } from '../context/theme'
import { I18nProvider } from '../context/i18n'

export default () => {
  return (
    <ToggleThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <Stack
            initialRouteName="loading"
            screenOptions={{
              headerShadowVisible: false
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="app.settings"
              options={{
                // Set the presentation mode to modal for our modal route.
                presentation: 'modal'
              }}
            />
            <Stack.Screen
              name="signin"
              options={{
                // Set the presentation mode to modal for our modal route.
                presentation: 'modal'
              }}
            />
          </Stack>
        </AuthProvider>
      </I18nProvider>
    </ToggleThemeProvider>
  )
}

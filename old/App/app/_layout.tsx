import { Stack } from 'expo-router'
import { NotificationProvider } from '../context/notification'
import { ApolloProvider } from '@apollo/client'
import Client from '../done/api/apollo'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../done/theme/config'
import { useThemeHook } from '../done/hook/theme'
import React, { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useAuthHook } from '../done/hook/auth'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Platform } from 'react-native'

export default function Layout() {
  const Dark = useThemeHook((state) => state.Dark)
  const Authenticate = useAuthHook((state) => state.Authenticate)

  useEffect(() => {
    Authenticate()
  }, [])

  return (
    <SafeAreaProvider
      style={{
        backgroundColor: Dark
          ? CombinedDarkTheme.colors.background
          : CombinedDefaultTheme.colors.background
      }}
    >
      <ThemeProvider value={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <PaperProvider theme={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
          <NotificationProvider>
            <ApolloProvider client={Client}>
              <StatusBar style={Dark ? 'light' : 'dark'} animated />
              <Stack
                screenOptions={{
                  headerShadowVisible: false
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                    animation: 'fade',
                    contentStyle: {
                      backgroundColor: Dark
                        ? CombinedDarkTheme.colors.background
                        : CombinedDefaultTheme.colors.background
                    }
                  }}
                />
                <Stack.Screen
                  name="createprofile"
                  options={{
                    headerBackTitleVisible: false,
                    presentation:
                      Platform.OS === 'ios' ? 'card' : 'transparentModal',
                    contentStyle: {
                      backgroundColor: Dark
                        ? CombinedDarkTheme.colors.background
                        : CombinedDefaultTheme.colors.background
                    }
                  }}
                />
                <Stack.Screen
                  name="updateprofile"
                  options={{
                    headerBackTitleVisible: false,
                    presentation:
                      Platform.OS === 'ios' ? 'card' : 'transparentModal',
                    contentStyle: {
                      backgroundColor: Dark
                        ? CombinedDarkTheme.colors.background
                        : CombinedDefaultTheme.colors.background
                    }
                  }}
                />
                <Stack.Screen
                  name="app.settings"
                  options={{
                    presentation:
                      Platform.OS === 'ios' ? 'modal' : 'transparentModal',
                    contentStyle: {
                      backgroundColor: Dark
                        ? CombinedDarkTheme.colors.background
                        : CombinedDefaultTheme.colors.background
                    }
                  }}
                />
                <Stack.Screen
                  name="(auth)"
                  options={{
                    presentation:
                      Platform.OS === 'ios' ? 'modal' : 'transparentModal',
                    contentStyle: {
                      backgroundColor: Dark
                        ? CombinedDarkTheme.colors.background
                        : CombinedDefaultTheme.colors.background
                    },
                    title: ' '
                    // headerShown: false
                  }}
                />
                <Stack.Screen
                  name="languge"
                  options={{
                    headerShown: false
                  }}
                />
              </Stack>
            </ApolloProvider>
          </NotificationProvider>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

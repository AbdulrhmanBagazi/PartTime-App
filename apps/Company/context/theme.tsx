import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { CombinedDefaultTheme, CombinedDarkTheme } from '../theme/config'
import { StatusBar } from 'expo-status-bar'
import * as SecureStore from 'expo-secure-store'

export type ThemeContextType = {
  ToggleTheme: () => void
  Dark: boolean
}

const ThemeContext = React.createContext<ThemeContextType>(null)

export function useTheme() {
  return React.useContext(ThemeContext)
}

export const ToggleThemeProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [Dark, setTheme] = React.useState(false)

  const ToggleTheme = async () => {
    const val = !Dark === true ? 'dark' : 'light'
    await SecureStore.setItemAsync('AppTheme', val)
    return setTheme(!Dark)
  }

  useEffect(() => {
    const getDark = async () => {
      const DarkStore = await SecureStore.getItemAsync('AppTheme')

      if (DarkStore) {
        if (DarkStore === 'dark') {
          await SecureStore.setItemAsync('AppTheme', 'dark')
          return setTheme(true)
        }

        await SecureStore.setItemAsync('AppTheme', 'light')
        return setTheme(false)
      }

      if (colorScheme) {
        if (colorScheme === 'dark') {
          return setTheme(true)
        }

        return setTheme(false)
      }

      return
    }

    getDark()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        ToggleTheme,
        Dark
      }}
    >
      <StatusBar style={Dark ? 'light' : 'dark'} animated />
      <ThemeProvider value={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <PaperProvider theme={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
          {children}
        </PaperProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

import React, { useEffect } from 'react'
import { I18nManager } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import Arabic from '../lang/Arabic.json'
import English from '../lang/English.json'
import RNRestart from 'react-native-restart' // Import package from node modules

type ar = 'ar'
type en = 'en'

export type Language = ar | en
export type I18n = typeof Arabic | typeof English

type I18nContextType = {
  ToggleI18n: (Lang: Language) => void
  Lang: Language
  I18n: I18n
}

const I18nContext = React.createContext<I18nContextType>(null)

export function useI18n() {
  return React.useContext(I18nContext)
}

export const I18nProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [Lang, setLang] = React.useState<Language>('en')
  const [I18n, setI18n] = React.useState<I18n>(English)

  const ToggleI18n = async (Lang: Language) => {
    if (Lang === 'ar') {
      await SecureStore.setItemAsync('AppLang', 'ar')
      setLang('ar')
      setI18n(Arabic)
      I18nManager.forceRTL(true)
      I18nManager.allowRTL(true)

      return RNRestart.restart()
    }

    await SecureStore.setItemAsync('AppLang', 'en')
    setLang('en')
    setI18n(English)
    I18nManager.forceRTL(false)
    I18nManager.allowRTL(false)

    return RNRestart.restart()
  }

  useEffect(() => {
    const getDark = async () => {
      const LangStore = await SecureStore.getItemAsync('AppLang')

      if (LangStore) {
        if (LangStore === 'en') {
          setI18n(English)
          setLang('en')
          return
        }
        setI18n(Arabic)
        setLang('ar')
        return
      }

      return
    }

    getDark()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <I18nContext.Provider
      value={{
        ToggleI18n,
        Lang,
        I18n
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

import { ActivityIndicator, View } from 'react-native'
import { useAuth } from '../context/auth'
import { SplashScreen, useRootNavigation, useRouter } from 'expo-router'
import { useEffect } from 'react'
import Page from '../layout/page'

export default function Loading() {
  const { auth, loading, Authenticate } = useAuth()
  const router = useRouter()
  const ExpoRouter = useRootNavigation()

  useEffect(() => {
    //check if user authenticated
    Authenticate()
  }, [])

  useEffect(() => {
    if (auth) {
      return router.replace('(tabs)/home')
    }

    if (!auth && !loading) {
      return router.replace('(tabs)/home')
    }
  }, [auth, loading])

  if (!ExpoRouter.isReady()) {
    return <SplashScreen />
  }

  return (
    <Page scrollEnabled={false}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    </Page>
  )
}

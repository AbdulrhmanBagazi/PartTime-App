import { ActivityIndicator, View } from 'react-native'
import { useAuth } from '../context/auth'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import Page from '../layout/page'

export default function Loading() {
  const { setAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    //check if user authenticated
    setTimeout(() => {
      setAuth(false)
      return router.replace('(tabs)/home')
    }, 2000)
  }, [])

  return (
    <Page scrollEnabled={false}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    </Page>
  )
}

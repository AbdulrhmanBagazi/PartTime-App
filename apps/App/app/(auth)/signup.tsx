import { Stack, useNavigation, useRouter } from 'expo-router'
import Page from '../../layout/page'
import MGoogleButton from '../../components/googleButton'
import MAppleButton from '../../components/appleButton'
import { useEffect, useRef } from 'react'
import { Button, Divider } from 'react-native-paper'
import EmailForm from '../../components/emailForm'
import SignupForm from '../../components/signupFrom'
import { Image } from 'expo-image'
import { I18nManager, Keyboard, Platform, View } from 'react-native'
import { useTheme as PaperTheme } from 'react-native-paper'
import { useI18nHook } from '../../hook/i18n'
import { useThemeHook } from '../../hook/theme'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'
import { useAuthHook } from '../../hook/auth'

export default function SignUp() {
  const I18n = useI18nHook((state) => state.I18n)
  const auth = useAuthHook((state) => state.auth)
  const loading = useAuthHook((state) => state.loading)

  const Dark = useThemeHook((state) => state.Dark)
  const router = useRouter()
  const theme = PaperTheme()
  const { addListener } = useNavigation()
  const windowWidth = Dimensions.get('window').width
  const ScrollViewRef = useRef<ScrollView>()

  const Switch = async (val: string) => {
    Keyboard.dismiss()
    if (val === 'signin') {
      if (I18nManager.isRTL) {
        return ScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
      }

      return ScrollViewRef.current.scrollToEnd({ animated: true })
    } else {
      if (I18nManager.isRTL) {
        return ScrollViewRef.current.scrollToEnd({ animated: true })
      }

      return ScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  useEffect(() => {
    if (auth) {
      return router.replace('(tabs)/profile')
    }
  }, [auth])

  useEffect(
    () =>
      addListener('beforeRemove', (e) => {
        if (Platform.OS === 'ios') {
          return
        }

        if (!loading && Platform.OS === 'android') {
          return
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault()

        // Prompt the user before leaving the screen
      }),
    [addListener, loading]
  )

  return (
    <Page>
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : Dark ? 'light' : 'dark'}
        animated
      />
      <Stack.Screen
        options={{
          gestureEnabled: !loading,
          headerBackVisible: !loading
        }}
      />
      <View
        style={{
          flex: 1,
          height: 150,
          marginVertical: 50
        }}
      >
        <Image
          source={require('../../assets/logo.png')}
          transition={1000}
          contentFit="contain"
          style={{
            flex: 1,
            width: '100%'
          }}
        />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        ref={ScrollViewRef}
        style={{ flexGrow: 1 }}
      >
        <View
          style={{
            flex: 1,
            width: windowWidth - 20,
            justifyContent: 'center'
          }}
        >
          <View style={{ padding: 10, justifyContent: 'center' }}>
            <EmailForm I18n={I18n} />
            <Button
              disabled={loading}
              mode="text"
              onPress={() => Switch('signin')}
              style={{ marginTop: 10 }}
              textColor={theme.colors.secondary}
            >
              {I18n.SignIn.SignUp}
            </Button>
            <Divider style={{ marginVertical: 10 }} />
            <MGoogleButton dark={Dark} text={I18n.SignIn.Google} />
            <Divider
              style={{ width: 100, marginVertical: 10, alignSelf: 'center' }}
            />
            {Platform.OS === 'ios' ? (
              <MAppleButton dark={Dark} text={I18n.SignIn.Apple} />
            ) : null}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: windowWidth - 10,
            justifyContent: 'center'
          }}
        >
          <View style={{ padding: 10, justifyContent: 'center' }}>
            <SignupForm I18n={I18n} />
            <Button
              disabled={loading}
              mode="text"
              onPress={() => Switch('signup')}
              style={{ marginTop: 10 }}
              textColor={theme.colors.secondary}
            >
              {I18n.SignIn.HaveAccount}
            </Button>
          </View>
        </View>
      </ScrollView>
      {/* {value === 'signin' ? (
    
      ) : (
     
      )} */}
    </Page>
  )
}

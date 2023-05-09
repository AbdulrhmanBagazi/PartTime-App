import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import { Banner, Button, Chip, Text, ToggleButton } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { useAuth } from '../../context/auth'
import { useState } from 'react'
import { Image } from 'expo-image'
import LocalNotification from '../../components/localNotification'

export default function Profile() {
  const { I18n } = useI18n()
  const { user } = useAuth()
  const { auth, loading } = useAuth()
  const router = useRouter()
  const [visible, setVisible] = useState(true)
  const [status, setStatus] = useState<'checked' | 'unchecked'>('checked')

  const onButtonToggle = (value) => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked')
  }

  return (
    <Page>
      <Text variant="bodyLarge">{user?.email}</Text>
      <Text variant="bodyLarge">{user?.verfied.toString()}</Text>
      {/* space */}
      <View style={{ height: 10 }} />
      {/* space */}
      <Banner
        visible={visible}
        // elevation={5}
        actions={[
          {
            label: 'Fix it',
            onPress: () => setVisible(false)
          },
          {
            label: 'Learn more',
            onPress: () => setVisible(false)
          }
        ]}
        icon={({ size }) => (
          <Image
            source={{
              uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4'
            }}
            style={{
              width: size,
              height: size
            }}
            transition={1000}
          />
        )}
      >
        There was a problem processing a transaction on your credit card.
      </Banner>
      {/* space */}
      <View style={{ height: 20 }} />
      {/* space */}
      <Chip mode="flat" selected={true} showSelectedOverlay elevated={true}>
        Example Chip
      </Chip>
      {/* space */}
      <View style={{ height: 20 }} />
      {/* space */}
      <Chip mode="flat" selected={false} showSelectedOverlay elevated={false}>
        Example Chip
      </Chip>
      {/* space */}
      <View style={{ height: 20 }} />
      {/* space */}
      <Chip mode="outlined" selected={true} showSelectedOverlay>
        Example Chip
      </Chip>
      {/* space */}
      <View style={{ height: 20 }} />
      {/* space */}
      <Chip mode="outlined" selected={false} showSelectedOverlay>
        Example Chip
      </Chip>
      {/* space */}
      <View style={{ height: 20 }} />
      {/* space */}
      <ToggleButton
        icon="bluetooth"
        value="bluetooth"
        status={status}
        onPress={onButtonToggle}
      />
      {/* space */}
      <View style={{ height: 20 }} />
      {/* space */}

      {auth ? null : (
        <Button
          icon="login"
          mode="contained"
          onPress={() => router.push('/(auth)/signin')}
          disabled={loading}
        >
          {I18n.Profile.SignIn}
        </Button>
      )}
      {/* space */}
      <View style={{ height: 20 }} />
      {/* space */}
      <LocalNotification />
    </Page>
  )
}

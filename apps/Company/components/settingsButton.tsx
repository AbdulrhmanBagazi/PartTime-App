import { IconButton } from 'react-native-paper'
import { useRouter } from 'expo-router'

export default function SettingsButton() {
  const router = useRouter()

  return (
    <IconButton
      icon="cog"
      size={25}
      onPress={() => router.push('/app.settings')}
    />
  )
}

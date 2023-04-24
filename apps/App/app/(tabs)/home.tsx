import { Surface, Text } from 'react-native-paper'
import { useAuth } from '../../context/auth'
import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import { globaStyles } from '../../styles/global.styles'

export default function Home() {
  const { auth } = useAuth()
  const { I18n } = useI18n()

  return (
    <Page>
      <Surface style={globaStyles.surface} elevation={4}>
        <Text variant="displayLarge">{I18n.Home.Title}</Text>
        <Text variant="headlineMedium">{auth.toString()}</Text>
      </Surface>
    </Page>
  )
}

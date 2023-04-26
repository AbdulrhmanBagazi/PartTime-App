import { Button, Surface, Text } from 'react-native-paper'
import { useAuth } from '../../context/auth'
import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import { globaStyles } from '../../styles/global.styles'
import { useSnack } from '../../context/snack'

export default function Home() {
  const { auth } = useAuth()
  const { I18n } = useI18n()
  const { ToggleSnackBar } = useSnack()

  return (
    <Page>
      <Surface style={globaStyles.surface} mode="flat">
        <Text variant="displayLarge">{I18n.Home.Title}</Text>
        <Text variant="headlineMedium">{auth.toString()}</Text>
      </Surface>

      <Button
        icon="login"
        mode="contained"
        onPress={() => ToggleSnackBar('SignOut')}
      >
        {I18n['App.Settings'].SignOut}
      </Button>
    </Page>
  )
}

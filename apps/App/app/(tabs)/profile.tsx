import { Surface, Text } from 'react-native-paper'
import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import { globaStyles } from '../../styles/global.styles'

export default function Profile() {
  const { I18n } = useI18n()

  return (
    <Page>
      <Surface style={globaStyles.surface} elevation={4} mode="flat">
        <Text variant="displayLarge">{I18n.Profile.Title}</Text>
      </Surface>
    </Page>
  )
}

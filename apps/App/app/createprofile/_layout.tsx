import { Stack, useRouter } from 'expo-router'
// import { useI18n } from '../../context/i18n'
import Page from '../../layout/page'
import {
  IconButton,
  Card,
  Text,
  useTheme as PaperTheme
} from 'react-native-paper'
import { useI18n } from '../../context/i18n'

export default () => {
  const router = useRouter()
  const theme = PaperTheme()
  const { I18n } = useI18n()

  return (
    <Page>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          headerTintColor: theme.colors.onPrimary,
          headerLeft: () => (
            <IconButton
              icon="close"
              iconColor={theme.colors.onPrimary}
              size={20}
              onPress={() => router.back()}
            />
          ),
          animation: 'slide_from_bottom',
          gestureDirection: 'vertical',
          title: I18n.createprofile.Title
          // gestureEnabled: false,
          // headerBackVisible: false
        }}
      />
      <Card mode="elevated">
        <Card.Title title="Card contained" subtitle="Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">title</Text>
          <Text variant="bodyMedium">content</Text>
        </Card.Content>
      </Card>
    </Page>
  )
}

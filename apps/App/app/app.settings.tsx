import { Alert, StyleSheet, View } from 'react-native'
import { Link, Stack, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Page from '../layout/page'
import { useTheme } from '../context/theme'
import { Text, Switch, Divider, RadioButton, Button } from 'react-native-paper'
import { useI18n } from '../context/i18n'
import { useAuth } from '../context/auth'
import { useTheme as useThemePaper } from 'react-native-paper'

export default function Modal() {
  const navigation = useNavigation()
  const { ToggleTheme, Dark } = useTheme()
  const { SignOut, loading, auth } = useAuth()
  const isPresented = navigation.canGoBack()
  const { Lang, ToggleI18n, I18n } = useI18n()
  const theme = useThemePaper()

  return (
    <Page>
      <StatusBar style="light" animated />
      <Stack.Screen
        options={{
          title: I18n['App.Settings'].Title,
          gestureEnabled: !loading,
          headerBackVisible: !loading
        }}
      />
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      <View style={{ flex: 1 }}>
        <Text variant="bodyLarge">{I18n['App.Settings'].Theme}</Text>
        <View style={styles.items}>
          <Text variant="labelLarge">{I18n['App.Settings'].DarkMode}</Text>
          <Switch value={Dark} onValueChange={ToggleTheme} />
        </View>
        <Divider style={styles.Divider} />
        <Text variant="bodyLarge">{I18n['App.Settings'].Language}</Text>
        <View style={styles.items}>
          <Text variant="labelLarge">{I18n['App.Settings'].Arabic}</Text>
          <RadioButton
            value="ar"
            status={Lang === 'ar' ? 'checked' : 'unchecked'}
            onPress={() => ToggleI18n('ar')}
          />
        </View>
        <View style={styles.items}>
          <Text variant="labelLarge">{I18n['App.Settings'].English}</Text>
          <RadioButton
            value="en"
            status={Lang === 'en' ? 'checked' : 'unchecked'}
            onPress={() => ToggleI18n('en')}
          />
        </View>
        <Divider />
      </View>

      {auth ? (
        <Button
          icon="login"
          mode="elevated"
          onPress={() =>
            Alert.alert(
              I18n['App.Settings'].SignOut,
              I18n.Alert['Alert.SignOut'],
              [
                {
                  text: I18n.Alert.No,
                  style: 'cancel'
                },
                { text: I18n.Alert.Yes, onPress: () => SignOut() }
              ]
            )
          }
          disabled={loading}
          style={{ marginBottom: 30 }}
          textColor={theme.colors.error}
        >
          {I18n['App.Settings'].SignOut}
        </Button>
      ) : null}
    </Page>
  )
}

const styles = StyleSheet.create({
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  Divider: {
    marginVertical: 10
  }
})

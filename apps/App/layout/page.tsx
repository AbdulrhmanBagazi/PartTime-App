import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal
} from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export default function Page(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
  scrollEnabled?: boolean
}) {
  const theme = useTheme()

  return (
    <ScrollView
      style={styles.ScrollView}
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={props.scrollEnabled}
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        {props.children}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  ScrollView: {
    flexGrow: 1
  }
})

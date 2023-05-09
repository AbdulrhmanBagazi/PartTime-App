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
    <View style={[styles.container]}>
      <ScrollView
        style={styles.ScrollView}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 10
        }}
        scrollEnabled={props.scrollEnabled}
      >
        {props.children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ScrollView: {
    flexGrow: 1
  }
})

import * as React from 'react'
import { IconButton, useTheme as useThemePaper } from 'react-native-paper'
import { useTheme } from '../context/theme'
import { View } from 'react-native'

const light = {
  pending: '#FBC02D',
  success: '#388E3C',
  declin: '#D32F2F',
  info: '#1976D2',
  archive: '#616161'
}

const dark = {
  pending: '#FFF59D',
  success: '#A5D6A7',
  declin: '#EF9A9A',
  info: '#90CAF9',
  archive: '#EEEEEE'
}

const StatusCode = () => {
  const { Dark } = useTheme()
  const theme = useThemePaper()

  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <IconButton
        icon="alert-circle"
        containerColor={Dark ? dark.pending : light.pending}
        iconColor={theme.colors.background}
        size={25}
      />

      <IconButton
        icon="alert-circle"
        containerColor={Dark ? dark.success : light.success}
        iconColor={theme.colors.background}
        size={25}
      />
      <IconButton
        icon="alert-circle"
        containerColor={Dark ? dark.declin : light.declin}
        iconColor={theme.colors.background}
        size={25}
      />

      <IconButton
        icon="alert-circle"
        containerColor={Dark ? dark.info : light.info}
        iconColor={theme.colors.background}
        size={25}
      />

      <IconButton
        icon="alert-circle"
        containerColor={Dark ? dark.archive : light.archive}
        iconColor={theme.colors.background}
        size={25}
      />
    </View>
  )
}

export default StatusCode

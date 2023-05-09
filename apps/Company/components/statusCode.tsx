import * as React from 'react'
import { Badge, Text } from 'react-native-paper'
import { useTheme } from '../context/theme'
import { View } from 'react-native'

const light = {
  pending: '#FBC02D',
  success: '#388E3C',
  decline: '#D32F2F',
  info: '#1976D2',
  archive: '#616161'
}

const dark = {
  pending: '#FFF59D',
  success: '#A5D6A7',
  decline: '#EF9A9A',
  info: '#90CAF9',
  archive: '#EEEEEE'
}

const StatusCode = () => {
  const { Dark } = useTheme()

  return (
    <View>
      <Text variant="titleLarge" style={{ textAlign: 'center', padding: 10 }}>
        Status badge
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}
      >
        <Badge
          style={{ backgroundColor: Dark ? dark.pending : light.pending }}
        ></Badge>
        <Badge
          style={{ backgroundColor: Dark ? dark.success : light.success }}
        ></Badge>
        <Badge
          style={{ backgroundColor: Dark ? dark.decline : light.decline }}
        ></Badge>
        <Badge
          style={{ backgroundColor: Dark ? dark.info : light.info }}
        ></Badge>
        <Badge
          style={{ backgroundColor: Dark ? dark.archive : light.archive }}
        ></Badge>
      </View>
    </View>
  )
}

export default StatusCode

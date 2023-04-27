import { Avatar, Button, Card, FAB, Surface, Text } from 'react-native-paper'
import Page from '../../layout/page'
import { globaStyles } from '../../styles/global.styles'
import { View } from 'react-native'
import { useSnack } from '../../context/snack'
import { useTheme } from '../../context/theme'
import { Image } from 'expo-image'
import StatusCode from '../../components/statusCode'

export default function Home() {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />
  const { ToggleSnackBar } = useSnack()
  const { ToggleTheme } = useTheme()

  return (
    <View style={{ flex: 1 }}>
      <Page>
        <StatusCode />
        <Card mode="contained">
          <Card.Title
            title="Card contained"
            subtitle="Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">title</Text>
            <Text variant="bodyMedium">content</Text>
          </Card.Content>
          <View
            style={{
              flex: 1,
              height: 250
            }}
          >
            <Image
              source={{ uri: 'https://picsum.photos/700' }}
              transition={1000}
              contentFit="cover"
              style={{
                flex: 1,
                width: '100%'
              }}
            />
          </View>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>

        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}

        <Card mode="elevated">
          <Card.Title
            title="Card elevated"
            subtitle="Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">title</Text>
            <Text variant="bodyMedium">content</Text>
          </Card.Content>
          <View
            style={{
              flex: 1,
              height: 250
            }}
          >
            <Image
              source={{ uri: 'https://picsum.photos/700' }}
              transition={1000}
              contentFit="cover"
              style={{
                flex: 1,
                width: '100%'
              }}
            />
          </View>
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Card mode="outlined">
          <Card.Title
            title="Card outlined"
            subtitle="Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">title</Text>
            <Text variant="bodyMedium">content</Text>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="flat" elevation={1}>
          <Text variant="displayLarge">flat</Text>
        </Surface>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="flat" elevation={2}>
          <Text variant="displayLarge">flat</Text>
        </Surface>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="flat" elevation={3}>
          <Text variant="displayLarge">flat</Text>
        </Surface>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="flat" elevation={4}>
          <Text variant="displayLarge">flat</Text>
        </Surface>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="flat" elevation={5}>
          <Text variant="displayLarge">flat</Text>
        </Surface>

        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="elevated" elevation={1}>
          <Text variant="displayLarge">elevated</Text>
        </Surface>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="elevated" elevation={2}>
          <Text variant="displayLarge">elevated</Text>
        </Surface>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="elevated" elevation={3}>
          <Text variant="displayLarge">elevated</Text>
        </Surface>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="elevated" elevation={4}>
          <Text variant="displayLarge">elevated</Text>
        </Surface>
        {/* space */}
        <View style={{ height: 20 }} />
        {/* space */}
        <Surface style={globaStyles.surface} mode="elevated" elevation={5}>
          <Text variant="displayLarge">elevated</Text>
        </Surface>
      </Page>

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0
        }}
        onPress={() => ToggleSnackBar('SignOut')}
      />

      <FAB
        icon="theme-light-dark"
        style={{
          position: 'absolute',
          margin: 16,
          left: 0,
          bottom: 0
        }}
        onPress={() => ToggleTheme()}
      />
    </View>
  )
}

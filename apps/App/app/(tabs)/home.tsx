import Page from '../../layout/page'
import { View } from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper'
import { Image } from 'expo-image'

export default function Home() {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />

  return (
    <Page>
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
          <Button mode="outlined">Cancel</Button>
          <Button mode="contained">Ok</Button>
        </Card.Actions>
      </Card>
    </Page>
  )
}

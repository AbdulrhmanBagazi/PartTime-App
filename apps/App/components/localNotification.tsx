import * as Notifications from 'expo-notifications'
import { Button } from 'react-native-paper'

const LocalNotification: React.FC<{}> = ({}) => {
  const scheduleAndCancel = async () => {
    //User Must Allow Notifications
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hey!'
      },
      trigger: { seconds: 10, repeats: false }
    })

    console.log(identifier)
    // await Notifications.cancelScheduledNotificationAsync(identifier)
    // await Notifications.getAllScheduledNotificationsAsync()
  }

  return (
    <>
      <Button
        icon="bell-ring"
        mode="contained"
        onPress={() => scheduleAndCancel()}
      >
        Trigger Reminder in 10s
      </Button>
    </>
  )
}

export default LocalNotification

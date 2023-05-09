import { View } from 'react-native'
import {
  List,
  Text,
  useTheme as PaperTheme,
  Avatar,
  Button,
  Divider,
  Card,
  IconButton
} from 'react-native-paper'
import { UserTypes } from '../../../types/types'
import { I18n, Language } from '../../../context/i18n'
import { useRouter } from 'expo-router'

const ProfileUi: React.FC<{
  auth: boolean
  user: UserTypes
  I18n: I18n
  Lang: Language
}> = ({ auth, user, I18n, Lang }) => {
  const theme = PaperTheme()
  const router = useRouter()

  if (!auth) {
    return (
      <>
        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <View style={{ flex: 1 }}>
            <Text variant="displayLarge">{I18n.Profile.Hello}</Text>
            <Text variant="displaySmall">{I18n.Profile.Guest}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Text
              size={100}
              label="G"
              color={theme.colors.onSecondaryContainer}
              style={{
                backgroundColor: theme.colors.secondaryContainer
              }}
            />
          </View>
        </View>
        <List.Section>
          <Card mode="elevated">
            <Card.Content>
              <List.Item
                title={I18n.Profile.CV}
                left={() => (
                  <View>
                    <List.Icon
                      icon="information"
                      color={theme.colors.tertiary}
                    />
                  </View>
                )}
              />
            </Card.Content>
          </Card>
        </List.Section>
      </>
    )
  }

  if (!user?.Profile) {
    return (
      <>
        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <View style={{ flex: 1 }}>
            <Text variant="displayLarge">{I18n.Profile.Hello}</Text>
            <Text variant="displaySmall">{I18n.Profile.NewUser}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Text
              size={100}
              label="G"
              color={theme.colors.onSecondaryContainer}
              style={{
                backgroundColor: theme.colors.secondaryContainer
              }}
            />
          </View>
        </View>
        <List.Section>
          <Card mode="elevated">
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <List.Subheader>{I18n.Profile.CreateProfile}</List.Subheader>
            </View>
            <Divider />
            <Card.Content>
              <View
                style={{
                  padding: 10,
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <IconButton
                  icon="file-account"
                  size={50}
                  onPress={() => console.log('Pressed')}
                  iconColor={theme.colors.onPrimaryContainer}
                />
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                icon={Lang === 'ar' ? 'arrow-left' : 'arrow-right'}
                onPress={() => router.push('/createprofile')}
              >
                {I18n.Profile.Start}
              </Button>
            </Card.Actions>
          </Card>
        </List.Section>
      </>
    )
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 30
        }}
      >
        <View style={{ flex: 1 }}>
          <Text variant="displayLarge">{I18n.Profile.Hello}</Text>
          <Text variant="displaySmall">{I18n.Profile.NewUser}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar.Text
            size={100}
            label="A"
            color={theme.colors.background}
            style={{
              backgroundColor: theme.colors.primary
            }}
          />
        </View>
      </View>

      <List.Section>
        <Card mode="elevated">
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <List.Subheader>{I18n.Profile.PersonalInformation}</List.Subheader>
            <Button
              icon="pencil"
              mode="text"
              onPress={() => console.log('Pressed')}
              textColor={theme.colors.tertiary}
            >
              {I18n.Profile.Edit}
            </Button>
          </View>
          <Divider />
          <Card.Content>
            <List.Item
              title={I18n.Profile.Name}
              description="Abdulrhman Saeed Baqazi"
              descriptionNumberOfLines={2}
              left={() => (
                <View>
                  <List.Icon
                    icon="card-account-details"
                    color={theme.colors.secondary}
                  />
                </View>
              )}
            />

            <List.Item
              title={I18n.Profile.Nationality}
              description="Saudi"
              descriptionNumberOfLines={2}
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />

            <List.Item
              title={I18n.Profile.NationalId}
              description="1085521316"
              descriptionNumberOfLines={2}
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />

            <List.Item
              title={I18n.Profile.DateOfBirth}
              description="1994/07/22 (29y)"
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />
            <List.Item
              title={I18n.Profile.Gender}
              description="Male"
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />
            <List.Item
              title={I18n.Profile.City}
              description="Riyadh"
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />
          </Card.Content>
        </Card>
      </List.Section>
      <List.Section>
        <Card mode="elevated">
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <List.Subheader>{I18n.Profile.ContactInformation}</List.Subheader>
            <Button
              icon="pencil"
              mode="text"
              onPress={() => console.log('Pressed')}
              textColor={theme.colors.tertiary}
            >
              {I18n.Profile.Edit}
            </Button>
          </View>
          <Divider />
          <Card.Content>
            <List.Item
              title={I18n.Profile.Phone}
              description="+966503418000"
              left={() => (
                <View>
                  <List.Icon icon="phone" color={theme.colors.secondary} />
                </View>
              )}
            />
            <List.Item
              title={I18n.Profile.WhatsApp}
              description="+966503418000"
              left={() => (
                <View>
                  <List.Icon icon="whatsapp" color={theme.colors.secondary} />
                </View>
              )}
            />
          </Card.Content>
        </Card>
      </List.Section>

      <List.Section>
        <Card mode="elevated">
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <List.Subheader>{I18n.Profile.GeneralInformation}</List.Subheader>
            <Button
              icon="pencil"
              mode="text"
              onPress={() => console.log('Pressed')}
              textColor={theme.colors.tertiary}
            >
              {I18n.Profile.Edit}
            </Button>
          </View>
          <Divider />
          <Card.Content>
            <List.Item
              title={I18n.Profile.About}
              description="We're currently hiring account managers for our Pacific Northwest territory. The ideal candidate has 5+ years of sales experience and a demonstrated familiarity with the region. We're a fast-growing team with no cap on commission. Click here to learn more and apply."
              descriptionNumberOfLines={5}
              left={() => (
                <View>
                  <List.Icon
                    icon="information"
                    color={theme.colors.secondary}
                  />
                </View>
              )}
            />
            <List.Item
              title={I18n.Profile.Education}
              description="Bacholer Degree: Information Technology"
              descriptionNumberOfLines={2}
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />
            <List.Item
              title={I18n.Profile.Experinces}
              descriptionNumberOfLines={2}
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />
          </Card.Content>
        </Card>
      </List.Section>

      <List.Section>
        <Card mode="elevated">
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <List.Subheader>{I18n.Profile.VideoInterview}</List.Subheader>
            <Button
              icon="pencil"
              mode="text"
              onPress={() => console.log('Pressed')}
              textColor={theme.colors.tertiary}
            >
              {I18n.Profile.Edit}
            </Button>
          </View>
          <Divider />
          <Card.Content>
            <List.Item
              title={I18n.Profile.Arabic}
              left={() => (
                <View>
                  <List.Icon icon="video-box" color={theme.colors.secondary} />
                </View>
              )}
              right={() => (
                <View>
                  <List.Icon
                    icon="check"
                    color={theme.colors.onSecondaryContainer}
                  />
                </View>
              )}
              //   onPress={() => console.log('video')}
            />
            <List.Item
              title={I18n.Profile.English}
              left={() => (
                <View>
                  <List.Icon icon="video-box" color={theme.colors.secondary} />
                </View>
              )}
              //   right={() => (
              //     <View>
              //       <List.Icon
              //         icon="cloud-upload"
              //         color={theme.colors.onPrimaryContainer}
              //       />
              //     </View>
              //   )}
              //   onPress={() => console.log('video')}
            />
          </Card.Content>
        </Card>
      </List.Section>
    </>
  )
}

export default ProfileUi

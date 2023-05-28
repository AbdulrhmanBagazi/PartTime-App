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
import { useRouter } from 'expo-router'
import { I18n, Language } from '../../../hook/i18n'
import countries from 'i18n-iso-countries'

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
          <Card mode="contained">
            <Card.Content>
              <List.Item
                title={I18n.Profile.CV}
                titleNumberOfLines={5}
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
          <Card mode="contained">
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
                onPress={() => router.push('createprofile')}
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
          <Text variant="displaySmall">{user.Profile.name.split(' ')[0]}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar.Text
            size={100}
            label={user.Profile.name.slice(0, 1)}
            color={theme.colors.background}
            style={{
              backgroundColor: theme.colors.primary
            }}
          />
        </View>
      </View>

      <List.Section>
        <Card mode="contained">
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <List.Subheader>{I18n.Profile.PersonalInformation}</List.Subheader>
          </View>
          <Divider />
          <Card.Content>
            <List.Item
              title={I18n.Profile.Name}
              description={user.Profile.name}
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
              description={countries.getName(user.Profile.nationality, Lang, {
                select: 'official'
              })}
              descriptionNumberOfLines={2}
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />

            <List.Item
              title={I18n.Profile.NationalId}
              description={user.Profile.nationalID}
              descriptionNumberOfLines={2}
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />

            <List.Item
              title={I18n.Profile.age}
              description={user.Profile.age}
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />
            <List.Item
              title={I18n.Profile.Gender}
              description={
                user.Profile.gender === 'Male'
                  ? I18n.Profile.Male
                  : I18n.Profile.Female
              }
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
        <Card mode="contained">
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
              description={user.Profile.phone}
              left={() => (
                <View>
                  <List.Icon icon="phone" color={theme.colors.secondary} />
                </View>
              )}
            />
            <List.Item
              title={I18n.Profile.WhatsApp}
              description={user.Profile.whatsapp}
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
        <Card mode="contained">
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
              description={user.Profile.about}
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
              title={I18n.Profile.City}
              description={user.Profile.city}
              left={() => (
                <View>
                  <List.Icon icon="circle-small" color={theme.colors.outline} />
                </View>
              )}
            />
            <List.Item
              title={I18n.Profile.Education}
              description={user.Profile.degree}
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
        <Card mode="contained">
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
              // right={() => (
              //   <View>
              //     <List.Icon
              //       icon="check"
              //       color={theme.colors.onSecondaryContainer}
              //     />
              //   </View>
              // )}
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

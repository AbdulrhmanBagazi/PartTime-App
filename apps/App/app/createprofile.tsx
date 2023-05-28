import Page from '../layout/page'
import {
  Card,
  Text,
  List,
  useTheme as PaperTheme,
  TextInput,
  Button,
  HelperText,
  Dialog,
  RadioButton,
  Portal,
  Snackbar
} from 'react-native-paper'
import { useMutation } from '@apollo/client'
import {
  Create_UserProfileDocument,
  Create_UserProfileMutation,
  Create_UserProfileMutationVariables
} from '../graphql/generated'
import { View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Formik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import { useI18nHook } from '../hook/i18n'
import moment from 'moment'
import { FlashList } from '@shopify/flash-list'
import countriesjson from '../components/country/country.json'
import countries from 'i18n-iso-countries'
import { useAuthHook } from '../hook/auth'

export default function CreateProfile() {
  const theme = PaperTheme()
  const I18n = useI18nHook((state) => state.I18n)
  const Language = useI18nHook((state) => state.Language)
  const Direction = useI18nHook((state) => state.Direction)
  const [visible, setVisible] = useState(false)
  const router = useRouter()
  const UpdateUserProfile = useAuthHook((state) => state.UpdateUserProfile)

  const [mutateFunction, { loading }] = useMutation<
    Create_UserProfileMutation,
    Create_UserProfileMutationVariables
  >(Create_UserProfileDocument, {
    onError() {
      setVisible(!visible)
    }
  })

  const [visibleGender, setVisibleGender] = useState(false)
  const showDialogGender = () => setVisibleGender(true)
  const hideDialogGender = () => setVisibleGender(false)

  const [visibleNationality, setVisibleNationality] = useState(false)
  const showDialogNationality = () => setVisibleNationality(true)
  const hideDialogNationality = () => setVisibleNationality(false)

  const CreateProfileValidationSchema = yup.object().shape({
    name: yup.string().required('Required'),
    nationalID: yup.string().length(10).required('Required'),
    gender: yup.string().required('Required'),
    day: yup.number().required('Required'),
    month: yup.number().min(1).max(12).required('Required'),
    year: yup.string().length(4).required('Required'),
    //
    nationality: yup.string().required('Required')
  })

  const convertToArabicNumber = async (string: any) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d: string) => {
      return d.charCodeAt(0) - 1632
    })
  }

  const CreateProfile = async (values: {
    name: string
    nationalID: string
    gender: string
    day: string
    month: string
    year: string
    nationality: string
  }) => {
    try {
      setVisible(false)
      // const date = await moment(new Date(age.val)).format('YYYY-MM-DD');
      const D = await convertToArabicNumber(values.day)
      const M = await convertToArabicNumber(values.month)
      const Y = await convertToArabicNumber(values.year)

      const makeDate = `${D.length === 1 ? '0' + D : D}/${
        M.length === 1 ? '0' + M : M
      }/${Y}`
      const date = moment(makeDate, 'DD/MM/YYYY').calendar()
      const Nid = await convertToArabicNumber(values.nationalID)

      const val = await mutateFunction({
        variables: {
          name: values.name,
          nationalID: Nid,
          gender: values.gender,
          age: date,
          nationality: values.nationality
        }
      })

      await UpdateUserProfile(val.data.Create_UserProfile)

      return router.back()
    } catch (error) {
      return setVisible(!visible)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Page>
        <Stack.Screen
          options={{
            gestureEnabled: !loading,
            headerBackVisible: !loading,
            title: I18n.createprofile.Title
          }}
        />
        <View style={{ flex: 1, marginVertical: 5 }}>
          <Text variant="headlineLarge">
            {I18n.Profile.PersonalInformation}
          </Text>
        </View>

        <Card mode="contained" style={{ marginVertical: 5 }}>
          <Card.Content>
            <List.Item
              title={I18n.createprofile.CantChange}
              titleStyle={{ direction: Direction }}
              titleNumberOfLines={5}
              left={() => (
                <View>
                  <List.Icon icon="information" color={theme.colors.tertiary} />
                </View>
              )}
            />
          </Card.Content>
        </Card>
        <Formik
          initialValues={{
            name: '',
            nationalID: '',
            gender: '',
            day: '',
            month: '',
            year: '',
            nationality: ''
          }}
          onSubmit={(values) => CreateProfile(values)}
          validationSchema={CreateProfileValidationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
            values,
            errors,
            touched,
            isValid
          }) => (
            <>
              <TextInput
                style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
                label={I18n.Profile.Name}
                value={values.name}
                mode="outlined"
                error={errors.name && touched.name ? true : false}
                disabled={loading}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>

              <TextInput
                style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
                label={I18n.Profile.NationalId}
                value={values.nationalID}
                mode="outlined"
                error={errors.nationalID && touched.nationalID ? true : false}
                disabled={loading}
                onChangeText={handleChange('nationalID')}
                onBlur={handleBlur('nationalID')}
                keyboardType="numeric"
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row'
                }}
              >
                <TextInput
                  label={I18n.createprofile.Day}
                  mode="outlined"
                  disabled={loading}
                  error={errors.day && touched.day ? true : false}
                  onChangeText={handleChange('day')}
                  onBlur={handleBlur('day')}
                  keyboardType="numbers-and-punctuation"
                  maxLength={2}
                  style={{
                    flex: 1,
                    textAlign: Direction === 'rtl' ? 'right' : 'left',
                    marginHorizontal: 2
                  }}
                />
                <TextInput
                  label={I18n.createprofile.Month}
                  mode="outlined"
                  disabled={loading}
                  error={errors.month && touched.month ? true : false}
                  onChangeText={handleChange('month')}
                  onBlur={handleBlur('month')}
                  keyboardType="numbers-and-punctuation"
                  maxLength={2}
                  style={{
                    flex: 1,
                    textAlign: Direction === 'rtl' ? 'right' : 'left',
                    marginHorizontal: 2
                  }}
                />
                <TextInput
                  label={I18n.createprofile.Year}
                  mode="outlined"
                  disabled={loading}
                  error={errors.year && touched.year ? true : false}
                  onChangeText={handleChange('year')}
                  onBlur={handleBlur('year')}
                  keyboardType="numbers-and-punctuation"
                  maxLength={4}
                  style={{
                    flex: 1,
                    textAlign: Direction === 'rtl' ? 'right' : 'left',
                    marginHorizontal: 2
                  }}
                />
              </View>
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>

              <TextInput
                style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
                label={I18n.Profile.Gender}
                value={
                  values.gender === 'Male'
                    ? I18n.Profile.Male
                    : values.gender === 'Female'
                    ? I18n.Profile.Female
                    : values.gender
                }
                mode="outlined"
                error={errors.gender && touched.gender ? true : false}
                disabled={loading}
                editable={false}
                onChangeText={handleChange('gender')}
                onBlur={handleBlur('gender')}
                right={
                  <TextInput.Icon
                    icon="pencil"
                    onPress={() => showDialogGender()}
                  />
                }
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>

              <TextInput
                style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
                label={I18n.Profile.Nationality}
                value={countries.getName(values.nationality, Language, {
                  select: 'official'
                })}
                mode="outlined"
                error={errors.nationality && touched.nationality ? true : false}
                disabled={loading}
                editable={false}
                onChangeText={handleChange('nationality')}
                onBlur={handleBlur('nationality')}
                right={
                  <TextInput.Icon
                    icon="pencil"
                    onPress={() => showDialogNationality()}
                  />
                }
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>

              <Portal>
                <Dialog
                  visible={visibleGender}
                  onDismiss={hideDialogGender}
                  style={{ direction: Direction }}
                >
                  <Dialog.Content>
                    <View>
                      <RadioButton.Item
                        label={I18n.Profile.Male}
                        value="Male"
                        onPress={() => {
                          setValues({
                            ...values,
                            gender: 'Male'
                          }),
                            hideDialogGender()
                        }}
                      />
                      <RadioButton.Item
                        label={I18n.Profile.Female}
                        value="Female"
                        onPress={() => {
                          setValues({
                            ...values,
                            gender: 'Female'
                          }),
                            hideDialogGender()
                        }}
                      />
                    </View>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialogGender}>
                      {I18n.createprofile.Done}
                    </Button>
                  </Dialog.Actions>
                </Dialog>
                {/* country */}
                <Dialog
                  visible={visibleNationality}
                  onDismiss={hideDialogNationality}
                  style={{ direction: Direction }}
                >
                  <Dialog.Content>
                    <View
                      style={{
                        height: 500
                      }}
                    >
                      <FlashList
                        data={countriesjson}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <RadioButton.Item
                            label={countries.getName(
                              item['alpha-2'],
                              Language,
                              {
                                select: 'official'
                              }
                            )}
                            value={item['alpha-2']}
                            status={
                              item['alpha-2'] === values.nationality
                                ? 'checked'
                                : 'unchecked'
                            }
                            onPress={() => {
                              setValues({
                                ...values,
                                nationality: item['alpha-2']
                              }),
                                hideDialogNationality()
                            }}
                          />
                        )}
                        estimatedItemSize={200}
                      />
                    </View>
                  </Dialog.Content>

                  <Dialog.Actions>
                    <Button onPress={hideDialogNationality}>
                      {I18n.createprofile.Done}
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>

              <Button
                onPress={() => handleSubmit()}
                mode="contained"
                style={{ marginVertical: 10 }}
                disabled={!isValid || loading}
              >
                {I18n.createprofile.Create}
              </Button>
            </>
          )}
        </Formik>
      </Page>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(!visible)}
        duration={1000}
      >
        {I18n.Errors.Unknown}
      </Snackbar>
    </View>
  )
}

import Page from '../layout/page'
import {
  Card,
  Text,
  List,
  useTheme as PaperTheme,
  TextInput,
  Button,
  HelperText,
  Snackbar
} from 'react-native-paper'
import { useMutation } from '@apollo/client'
import {
  Create_UserProfileDocument,
  Create_UserProfileMutation,
  Create_UserProfileMutationVariables
} from '../done/graphql/generated'
import { View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Formik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import { useI18nHook } from '../done/hook/i18n'
import moment from 'moment'
import countriesjson from '../components/country/country.json'
import countries from 'i18n-iso-countries'
import { useAuthHook } from '../done/hook/auth'
import PickerDialog from '../components/PickerDialog'

export default function CreateProfile() {
  const theme = PaperTheme()
  const I18n = useI18nHook((state) => state.I18n)
  const Language = useI18nHook((state) => state.Language)
  const Direction = useI18nHook((state) => state.Direction)
  const [visibleError, setVisibleError] = useState(false)
  const [visibleUpdated, setVisibleUpdated] = useState(false)
  const router = useRouter()
  const UpdateUserProfile = useAuthHook((state) => state.UpdateUserProfile)
  const [mutateFunction, { loading }] = useMutation<
    Create_UserProfileMutation,
    Create_UserProfileMutationVariables
  >(Create_UserProfileDocument, {
    onError() {
      setVisibleError(true)
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

      setVisibleUpdated(true)
      await UpdateUserProfile(val.data.Create_UserProfile)
      return router.back()
    } catch (error) {
      return setVisibleError(true)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Page>
        <Stack.Screen
          options={{
            gestureEnabled: !loading,
            headerBackVisible: !loading,
            // title: I18n.createprofile.Title
            title: ' '
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

              <Text variant="labelLarge" style={{ letterSpacing: 1 }}>
                {I18n.Profile.DateOfBirthInput}
              </Text>
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

              {/* Gender */}
              <PickerDialog
                value={values.gender}
                visible={visibleGender}
                hideModal={hideDialogGender}
                data={[
                  { label: I18n.Profile.Male, value: 'Male' },
                  { label: I18n.Profile.Female, value: 'Female' }
                ]}
                onPress={(e) => {
                  setValues({
                    ...values,
                    gender: e
                  })
                }}
              />

              {/* Country */}
              <PickerDialog
                value={values.nationality}
                visible={visibleNationality}
                hideModal={hideDialogNationality}
                data={countriesjson}
                onPress={(e) => {
                  setValues({
                    ...values,
                    nationality: e
                  })
                }}
                country
              />

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
        visible={visibleError}
        onDismiss={() => setVisibleError(false)}
        duration={1000}
      >
        {I18n.Errors.Unknown}
      </Snackbar>

      <Snackbar
        visible={visibleUpdated}
        onDismiss={() => setVisibleUpdated(false)}
        duration={1000}
      >
        {I18n.Errors.ProfileUpdated}
      </Snackbar>
    </View>
  )
}

import Page from '../layout/page'
import {
  Text,
  TextInput,
  Button,
  HelperText,
  Snackbar
} from 'react-native-paper'
import { useMutation } from '@apollo/client'
import {
  Update_UserProfileDocument,
  Update_UserProfileMutation,
  Update_UserProfileMutationVariables
} from '../graphql/generated'
import { View } from 'react-native'
import { Stack } from 'expo-router'
import { Formik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import { useI18nHook } from '../hook/i18n'
import { useAuthHook } from '../hook/auth'
import PickerDialog from '../components/PickerDialog'

export default function UpdateProfile() {
  //City
  const [DialogCity, setDialogCity] = useState(false)
  const showDialogCity = () => setDialogCity(true)
  const hideDialogCity = () => setDialogCity(false)
  //
  //Education
  const [DialogEducation, setDialogEducation] = useState(false)
  const showDialogEducation = () => setDialogEducation(true)
  const hideDialogEducation = () => setDialogEducation(false)
  //
  const I18n = useI18nHook((state) => state.I18n)
  const Direction = useI18nHook((state) => state.Direction)
  const user = useAuthHook((state) => state.user)
  const [visibleError, setVisibleError] = useState(false)
  const UpdateUserProfile = useAuthHook((state) => state.UpdateUserProfile)
  const [mutateFunction, { loading }] = useMutation<
    Update_UserProfileMutation,
    Update_UserProfileMutationVariables
  >(Update_UserProfileDocument, {
    onError() {
      setVisibleError(!visibleError)
    }
  })
  const initialValues: Update_UserProfileMutationVariables = {
    phone: user.Profile.phone,
    whatsapp: user.Profile.whatsapp,
    about: user.Profile.about,
    city: user.Profile.city,
    education: user.Profile.education,
    //
    experiences: []
  }

  const UpdateProfileValidationSchema = yup.object().shape({
    phone: yup.string().required(),
    whatsapp: yup.string().optional(),
    about: yup.string().required(),
    city: yup.string().required(),
    education: yup.string().required()
  })

  const convertToArabicNumber = async (string: any) => {
    return string.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d: string) => {
      return d.charCodeAt(0) - 1632
    })
  }

  const UpdateProfile = async (values: Update_UserProfileMutationVariables) => {
    try {
      const phone = await convertToArabicNumber(values.phone)
      const whatsapp = await convertToArabicNumber(values.whatsapp)

      const val = await mutateFunction({
        variables: {
          phone,
          whatsapp,
          about: values.about,
          city: values.city,
          education: values.education
        }
      })

      return UpdateUserProfile(val.data.Update_UserProfile)
    } catch (error) {
      setVisibleError(!visibleError)
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

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => UpdateProfile(values)}
          validationSchema={UpdateProfileValidationSchema}
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
              <View style={{ flex: 1, marginVertical: 10 }}>
                <Text variant="headlineLarge">
                  {I18n.Profile.ContactInformation}
                </Text>
              </View>

              <TextInput
                style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
                label={I18n.Profile.Phone}
                value={values.phone}
                mode="outlined"
                error={errors.phone && touched.phone ? true : false}
                disabled={loading}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType="numeric"
                placeholder="05XXXXXXXX"
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>
              <TextInput
                style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
                label={I18n.Profile.WhatsApp}
                value={values.whatsapp}
                mode="outlined"
                error={errors.whatsapp && touched.whatsapp ? true : false}
                disabled={loading}
                onChangeText={handleChange('whatsapp')}
                onBlur={handleBlur('whatsapp')}
                keyboardType="numeric"
                placeholder="05XXXXXXXX"
                right={
                  <TextInput.Icon
                    icon={'repeat'}
                    onPress={() =>
                      setValues({
                        ...values,
                        whatsapp: values.phone
                      })
                    }
                  />
                }
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>
              <View style={{ flex: 1, marginVertical: 5 }}>
                <Text variant="headlineLarge">
                  {I18n.Profile.GeneralInformation}
                </Text>
              </View>

              <TextInput
                style={{
                  textAlign: Direction === 'rtl' ? 'right' : 'left'
                }}
                label={I18n.Profile.About}
                value={values.about}
                mode="outlined"
                error={errors.about && touched.about ? true : false}
                disabled={loading}
                onChangeText={handleChange('about')}
                onBlur={handleBlur('about')}
                multiline={true}
                numberOfLines={2}
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>

              <TextInput
                style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
                label={I18n.Profile.City}
                value={values.city}
                mode="outlined"
                error={errors.city && touched.city ? true : false}
                disabled={loading}
                editable={false}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                right={
                  <TextInput.Icon
                    icon="pencil"
                    onPress={() => showDialogCity()}
                  />
                }
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>

              <TextInput
                style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
                label={I18n.Profile.Education}
                value={values.education}
                mode="outlined"
                error={errors.education && touched.education ? true : false}
                disabled={loading}
                editable={false}
                onChangeText={handleChange('education')}
                onBlur={handleBlur('education')}
                right={
                  <TextInput.Icon
                    icon="pencil"
                    onPress={() => showDialogEducation()}
                  />
                }
              />
              <HelperText type="info" visible={true}>
                {' '}
              </HelperText>
              {/* City */}
              <PickerDialog
                value={values.city}
                visible={DialogCity}
                hideModal={hideDialogCity}
                data={[{ label: 'city', value: 'city' }]}
                onPress={(e) => {
                  setValues({
                    ...values,
                    city: e
                  })
                }}
              />
              {/* Education */}
              <PickerDialog
                value={values.education}
                visible={DialogEducation}
                hideModal={hideDialogEducation}
                data={[{ label: 'Education', value: 'Education' }]}
                onPress={(e) => {
                  setValues({
                    ...values,
                    education: e
                  })
                }}
              />

              <Button
                onPress={() => handleSubmit()}
                mode="contained"
                disabled={!isValid || loading}
              >
                {I18n.updateprofile.Update}
              </Button>
            </>
          )}
        </Formik>
      </Page>

      <Snackbar
        visible={visibleError}
        onDismiss={() => setVisibleError(!visibleError)}
        duration={1000}
      >
        {I18n.Errors.Unknown}
      </Snackbar>
    </View>
  )
}

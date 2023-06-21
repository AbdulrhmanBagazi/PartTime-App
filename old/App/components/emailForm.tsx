import { useState } from 'react'
import { Button, TextInput, HelperText } from 'react-native-paper'
import { Formik } from 'formik'
import * as yup from 'yup'
import { I18n, useI18nHook } from '../done/hook/i18n'
import { useAuthHook } from '../done/hook/auth'
import { QueryResponse, SignTypes } from '../done/types/types'

const EmailForm: React.FC<{ I18n: I18n }> = ({ I18n }) => {
  const SignIn = useAuthHook((state) => state.SignIn) as (
    arg0: SignTypes
  ) => QueryResponse
  const loading = useAuthHook((state) => state.loading)
  const [incorrect, setIncorrect] = useState(false)
  const Direction = useI18nHook((state) => state.Direction)

  const HandleLogin = async (values: { email: string; password: string }) => {
    const [error] = await SignIn(values)

    if (error?.status === 401) {
      setIncorrect(true)
    }

    setTimeout(() => {
      setIncorrect(false)
    }, 2000)
  }

  const SinginValidation = yup.object().shape({
    email: yup.string().email().required(I18n.SignIn.Required),
    password: yup.string().required(I18n.SignIn.Required)
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={(values) => HandleLogin(values)}
      validationSchema={SinginValidation}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid
      }) => (
        <>
          <TextInput
            style={{
              textAlign: Direction === 'rtl' ? 'right' : 'left'
            }}
            label={I18n.SignIn.Email}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            mode="outlined"
            error={errors.email && touched.email ? true : false}
            disabled={loading}
            keyboardType="email-address"
          />
          <HelperText type="error" visible={false}>
            {' '}
          </HelperText>
          <TextInput
            style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
            label={I18n.SignIn.Password}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            mode="outlined"
            error={errors.password && touched.password ? true : false}
            disabled={loading}
            secureTextEntry
          />
          {incorrect ? (
            <HelperText type="error" visible={incorrect}>
              {I18n.SignIn.Incorrect}
            </HelperText>
          ) : (
            <HelperText type="error" visible={false}>
              {' '}
            </HelperText>
          )}

          <Button
            disabled={!isValid || loading}
            onPress={() => handleSubmit()}
            style={{ marginTop: 10 }}
            mode="contained"
          >
            {I18n.SignIn.Title}
          </Button>
        </>
      )}
    </Formik>
  )
}

export default EmailForm

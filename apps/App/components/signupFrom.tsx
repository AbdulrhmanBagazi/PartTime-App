import { useState } from 'react'
import { Button, TextInput, HelperText } from 'react-native-paper'
import { QueryResponse, SignTypes } from '../types/types'
import { I18n, useI18nHook } from '../hook/i18n'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useAuthHook } from '../hook/auth'

const SignupForm: React.FC<{ I18n: I18n }> = ({ I18n }) => {
  const SignUp = useAuthHook((state) => state.SignUp) as (
    arg0: SignTypes
  ) => QueryResponse
  const loading = useAuthHook((state) => state.loading)

  const [myerrors, setErrors] = useState({
    email: false,
    emailUsed: false
  })
  const Direction = useI18nHook((state) => state.Direction)

  const HandleSignUp = async (values: { email: string; password: string }) => {
    const [error] = await SignUp(values)

    if (error?.status === 400) {
      myerrors.email = true
      myerrors.emailUsed = true
      return setErrors({
        ...myerrors
      })
    }
  }

  const SingupValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    repassword: yup
      .string()
      .label('confirm password')
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        repassword: ''
      }}
      onSubmit={(values) => HandleSignUp(values)}
      validationSchema={SingupValidation}
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
            style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
            label={I18n.SignUp.Email}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            mode="outlined"
            error={errors.email && touched.email ? true : false}
            disabled={loading}
            keyboardType="email-address"
          />
          {myerrors.emailUsed ? (
            <HelperText type="error" visible={myerrors.emailUsed}>
              {I18n.SignUp.EmailUsed}
            </HelperText>
          ) : (
            <HelperText type="error" visible={false}>
              {' '}
            </HelperText>
          )}
          <TextInput
            style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
            label={I18n.SignUp.Password}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            mode="outlined"
            error={errors.password && touched.password ? true : false}
            disabled={loading}
            secureTextEntry
          />
          <HelperText type="error" visible={errors?.password ? true : false}>
            {I18n.SignUp.PasswordStregth}
          </HelperText>

          <TextInput
            style={{ textAlign: Direction === 'rtl' ? 'right' : 'left' }}
            label={I18n.SignUp.RePassword}
            value={values.repassword}
            onChangeText={handleChange('repassword')}
            onBlur={handleBlur('repassword')}
            mode="outlined"
            error={errors.repassword && touched.repassword ? true : false}
            disabled={loading}
            secureTextEntry
          />
          <HelperText type="error" visible={errors?.repassword ? true : false}>
            {I18n.SignUp.PasswordCompare}
          </HelperText>

          <Button
            disabled={!isValid || loading}
            onPress={() => handleSubmit()}
            style={{ marginTop: 10 }}
            mode="contained"
          >
            {I18n.SignUp.Title}
          </Button>
        </>
      )}
    </Formik>
  )
}

export default SignupForm

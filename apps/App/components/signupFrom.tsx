import { useState } from 'react'
import { Button, TextInput, HelperText } from 'react-native-paper'
import { I18n } from '../context/i18n'
import { useAuth } from '../context/auth'
import { AuthenticatedTypes } from '../types/types'

const SignupForm: React.FC<{ I18n: I18n }> = ({ I18n }) => {
  const { loading, SignUp } = useAuth() as AuthenticatedTypes
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    repassword: false,
    emailUsed: false
  })

  const validateEmail = (email: string) => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmail(email)

    if (reg.test(email)) {
      errors.email = false
      errors.emailUsed = false
      return setErrors({
        ...errors
      })
    }
    errors.email = true
    errors.emailUsed = false
    return setErrors({
      ...errors
    })
  }

  const validatePassword = (val: string) => {
    setPassword(val)

    if (val.length >= 2) {
      errors.password = false
      return setErrors({
        ...errors
      })
    }
    errors.password = true
    return setErrors({
      ...errors
    })
  }

  const validateRePassword = (val: string) => {
    setRePassword(val)

    if (val !== password) {
      errors.repassword = true
      return setErrors({
        ...errors
      })
    }

    errors.repassword = false
    return setErrors({
      ...errors
    })
  }

  const HandleSignUp = async (values: { email: string; password: string }) => {
    if (values.email.length <= 0 && values.password.length <= 0) {
      return setErrors({
        email: true,
        password: true,
        repassword: true,
        emailUsed: false
      })
    }

    const [error] = await SignUp(values)

    if (error?.status === 400) {
      errors.email = true
      errors.emailUsed = true
      return setErrors({
        ...errors
      })
    }
  }

  return (
    <>
      <TextInput
        label={I18n.SignUp.Email}
        value={email}
        onChangeText={(val) => validateEmail(val)}
        onBlur={() => validateEmail(email)}
        mode="outlined"
        error={errors.email}
        disabled={loading}
        keyboardType="email-address"
      />
      {errors.emailUsed || errors.email ? (
        <HelperText type="error" visible={errors.emailUsed || errors.email}>
          {errors.emailUsed ? I18n.SignUp.EmailUsed : I18n.SignUp.EmailInvalid}
        </HelperText>
      ) : (
        <HelperText type="error" visible={false}>
          {' '}
        </HelperText>
      )}
      <TextInput
        label={I18n.SignUp.Password}
        value={password}
        onChangeText={(val) => validatePassword(val)}
        onBlur={() => validatePassword(password)}
        // style={{ marginTop: 10 }}
        mode="outlined"
        error={errors.password}
        disabled={loading}
        secureTextEntry
      />
      {errors.password ? (
        <HelperText type="error" visible={errors.password}>
          {I18n.SignUp.PasswordStregth}
        </HelperText>
      ) : (
        <HelperText type="error" visible={false}>
          {' '}
        </HelperText>
      )}
      <TextInput
        label={I18n.SignUp.RePassword}
        value={repassword}
        onChangeText={(val) => validateRePassword(val)}
        onBlur={() => validateRePassword(repassword)}
        // style={{ marginTop: 10 }}
        mode="outlined"
        error={errors.repassword}
        disabled={loading}
        secureTextEntry
      />
      {errors.repassword ? (
        <HelperText type="error" visible={errors.repassword}>
          {I18n.SignUp.PasswordCompare}
        </HelperText>
      ) : (
        <HelperText type="error" visible={false}>
          {' '}
        </HelperText>
      )}

      <Button
        disabled={
          errors.email || errors.password || errors.repassword || loading
        }
        mode="contained"
        onPress={() => HandleSignUp({ email, password })}
        style={{ marginTop: 10 }}
      >
        {I18n.SignUp.Title}
      </Button>
    </>
  )
}

export default SignupForm

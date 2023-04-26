import { useState } from 'react'
import { Button, TextInput, Text, HelperText } from 'react-native-paper'
import { I18n } from '../context/i18n'
import { useAuth } from '../context/auth'
import { AuthenticatedTypes } from '../types/types'
import { useRouter } from 'expo-router'

const EmailForm: React.FC<{ I18n: I18n }> = ({ I18n }) => {
  const { loading, SignIn } = useAuth() as AuthenticatedTypes
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    email: false,
    password: false
  })
  const [incorrect, setIncorrect] = useState(false)

  const validateEmail = (email: string) => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setEmail(email)

    if (reg.test(email)) {
      errors.email = false
      return setErrors({
        ...errors
      })
    }
    errors.email = true
    return setErrors({
      ...errors
    })
  }

  const validatePassword = (password: string) => {
    setPassword(password)

    if (password.length >= 1) {
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

  const HandleLogin = async (values: { email: string; password: string }) => {
    if (values.email.length <= 0 && values.password.length <= 0) {
      return setErrors({
        email: true,
        password: true
      })
    }

    const [error] = await SignIn(values)

    if (error?.status === 401) {
      setErrors({
        email: true,
        password: true
      })

      setIncorrect(true)
    }

    setTimeout(() => {
      setErrors({
        email: false,
        password: false
      })
      setIncorrect(false)
    }, 2000)
  }

  return (
    <>
      <Text variant="headlineLarge">{I18n.SignIn.EmailSignIn}</Text>

      <TextInput
        label={I18n.SignIn.Email}
        value={email}
        onChangeText={(val) => validateEmail(val)}
        onBlur={() => validateEmail(email)}
        style={{ marginTop: 10 }}
        mode="outlined"
        error={errors.email}
        disabled={loading}
      />
      <TextInput
        label={I18n.SignIn.Password}
        value={password}
        onChangeText={(val) => validatePassword(val)}
        onBlur={() => validatePassword(password)}
        style={{ marginTop: 10 }}
        mode="outlined"
        error={errors.password}
        disabled={loading}
        secureTextEntry
        keyboardType="email-address"
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
        disabled={errors.email || errors.password || loading}
        mode="contained"
        onPress={() => HandleLogin({ email, password })}
        style={{ marginTop: 20 }}
      >
        {I18n.SignIn.Title}
      </Button>

      <Button
        disabled={loading}
        mode="text"
        onPress={() => router.push('/signup')}
        style={{ marginTop: 10 }}
      >
        {I18n.SignIn.SignUp}
      </Button>
    </>
  )
}

export default EmailForm

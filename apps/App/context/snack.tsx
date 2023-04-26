import * as React from 'react'
import { Snackbar } from 'react-native-paper'
import { useI18n } from './i18n'

type Text = 'SignOut'

type SnackContextType = {
  ToggleSnackBar: (text: Text) => void
}

const SnackContext = React.createContext<SnackContextType>(null)

export function useSnack() {
  return React.useContext(SnackContext)
}

export const SnackProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [visible, setVisible] = React.useState(false)
  const [text, setText] = React.useState('')
  const { I18n } = useI18n()

  const ToggleSnackBar = (val: string) => {
    setText(val)
    setVisible(!visible)
  }

  const onDismissSnackBar = () => setVisible(false)

  return (
    <SnackContext.Provider
      value={{
        ToggleSnackBar
      }}
    >
      {children}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        wrapperStyle={{ marginBottom: 45 }}
      >
        {I18n.Snack[text]}
      </Snackbar>
    </SnackContext.Provider>
  )
}

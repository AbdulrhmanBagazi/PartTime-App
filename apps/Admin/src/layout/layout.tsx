import { useEffect, useState } from 'react'
import { Layout, useAuthState, Loading, LayoutProps } from 'react-admin'
import MyAppBar from './MyAppBar'
import MyMenu from './MyMenu'
import { useTheme, useLocaleState } from 'react-admin'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { darkTheme, lightTheme } from '../theme/theme'

export const MyLayout = (props: LayoutProps) => {
  const { isLoading } = useAuthState()
  const [show, setshow] = useState(false)
  const [locale] = useLocaleState()
  const [theme] = useTheme()

  const light = createTheme({
    ...lightTheme,
    direction: locale === 'ar' ? 'rtl' : 'ltr',
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            textAlign: locale === 'ar' ? 'right' : 'left',
          },
        },
      },
    },
  })
  const dark = createTheme({
    ...darkTheme,
    direction: locale === 'ar' ? 'rtl' : 'ltr',
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            textAlign: locale === 'ar' ? 'right' : 'left',
          },
        },
      },
    },
  })

  useEffect(() => {
    document.body.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
    setshow(true)
  }, [locale])

  if (isLoading && !show) {
    return <Loading />
  }

  return (
    <ThemeProvider theme={theme?.palette?.mode === 'dark' ? dark : light}>
      <Layout {...props} menu={MyMenu} appBar={MyAppBar}>
        {props.children}
      </Layout>
    </ThemeProvider>
  )
}

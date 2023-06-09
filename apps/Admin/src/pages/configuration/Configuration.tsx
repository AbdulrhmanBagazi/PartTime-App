import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useTranslate, useLocaleState, Title } from 'react-admin'
import ThemeToggler from '../../layout/ThemeToggler'

const Configuration = () => {
  const translate = useTranslate()
  const [locale, setLocale] = useLocaleState()

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Card>
        <Title title={translate('configuration.configuration')} />
        <CardContent>
          <Box sx={{ display: 'inline-block' }}>{translate('configuration.theme')}</Box>
          <ThemeToggler />
        </CardContent>
        <CardContent>
          <Box sx={{ display: 'inline-block' }}>{translate('configuration.language')}</Box>
          <Button
            variant="contained"
            sx={{ margin: '1em' }}
            color={locale === 'en' ? 'primary' : 'secondary'}
            onClick={() => setLocale('en')}>
            English
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '1em' }}
            color={locale === 'ar' ? 'primary' : 'secondary'}
            onClick={() => setLocale('ar')}>
            عربي
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Configuration

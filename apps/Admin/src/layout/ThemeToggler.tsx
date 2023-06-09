import { useTheme } from 'react-admin'
import { Button } from '@mui/material'
import { darkTheme, lightTheme } from '../theme/theme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const ThemeToggler = () => {
  const [theme, setTheme] = useTheme()

  return (
    <Button onClick={() => setTheme(theme?.palette?.mode === 'dark' ? lightTheme : darkTheme)}>
      {theme?.palette?.mode === 'light' ? <DarkModeIcon color="action" /> : <LightModeIcon />}
    </Button>
  )
}
export default ThemeToggler

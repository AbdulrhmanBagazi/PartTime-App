import {
  AppBarProps,
  SidebarToggleButton,
  // LoadingIndicator,
  Logout,
  UserMenu,
  LogoutProps,
  useTranslate,
} from 'react-admin'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ThemeToggler from './ThemeToggler'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link } from 'react-router-dom'

const MyLogoutButton = (props: LogoutProps) => <Logout {...props} icon={<ExitToAppIcon />} />

const ConfigurationMenu = () => {
  const translate = useTranslate()

  return (
    <MenuItem component={Link} to="/configuration">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText>{translate('configuration.configuration')}</ListItemText>
    </MenuItem>
  )
}

const MyUserMenu = (props: any) => {
  return (
    <UserMenu {...props}>
      <ConfigurationMenu />
      <MyLogoutButton />
    </UserMenu>
  )
}

const MyAppBar = (props: AppBarProps | any) => {
  return (
    <AppBar {...props} color="primary" elevation={1}>
      <div
        style={{
          flex: 1,
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <div
          style={{
            flex: 1,
            flexDirection: 'row',
            display: 'flex',
          }}>
          <SidebarToggleButton />
          <Toolbar>
            <Typography
              variant="h6"
              id="react-admin-title"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
              }}
            />
          </Toolbar>
        </div>

        <div
          style={{
            flex: 1,
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {/* <LoadingIndicator /> */}
          <ThemeToggler />
          <MyUserMenu />
        </div>
      </div>
    </AppBar>
  )
}

export default MyAppBar

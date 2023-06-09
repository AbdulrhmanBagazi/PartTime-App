import {
  DashboardMenuItem,
  Menu,
  MenuItemLink,
  useResourceDefinitions,
  useSidebarState,
  MenuProps,
} from 'react-admin'

const MyMenu = (props: MenuProps | any) => {
  const resources = useResourceDefinitions()
  const [open] = useSidebarState()

  return (
    <Menu {...props}>
      <DashboardMenuItem />
      {Object.keys(resources).map((name) => {
        if (name === 'eventday') {
          return null
        }

        return (
          <MenuItemLink
            key={name}
            to={`/${name}`}
            primaryText={(resources[name].options && resources[name].options.label) || name}
            onClick={props.onMenuClick}
            sidebarIsOpen={open}
            leftIcon={resources[name].icon}
          />
        )
      })}
    </Menu>
  )
}

export default MyMenu

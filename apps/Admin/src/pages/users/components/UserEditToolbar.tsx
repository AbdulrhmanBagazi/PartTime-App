import { Toolbar, SaveButton } from 'react-admin'

const UserEditToolbar = (props: object) => (
  <Toolbar {...props}>
    <SaveButton mutationOptions={{
      onError: () => {
        return
      }
    }
    } type="button" />
  </Toolbar>
)

export default UserEditToolbar

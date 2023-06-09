import { Toolbar, SaveButton } from 'react-admin'

const LocationEditToolbar = (props: object) => (
  <Toolbar {...props}>
    <SaveButton
      mutationOptions={{
        onError: () => {
          return
        },
      }}
      type="button"
    />
  </Toolbar>
)

export default LocationEditToolbar

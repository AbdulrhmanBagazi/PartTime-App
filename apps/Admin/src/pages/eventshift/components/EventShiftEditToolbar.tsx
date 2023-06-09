import { Toolbar, SaveButton } from 'react-admin'

const EventShiftEditToolbar = (props: object) => (
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

export default EventShiftEditToolbar

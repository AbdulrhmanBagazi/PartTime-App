import { Toolbar, SaveButton } from 'react-admin'

const EventEditToolbar = (props: object) => (
  <Toolbar {...props}>
    <SaveButton
      mutationOptions={{
        onError: () => {
          return
        },
      }}
      type="button"
      alwaysEnable
    />
  </Toolbar>
)

export default EventEditToolbar

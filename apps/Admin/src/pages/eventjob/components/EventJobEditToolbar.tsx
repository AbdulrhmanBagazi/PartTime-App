import { Toolbar, SaveButton } from 'react-admin'

const EventJobEditToolbar = (props: object) => (
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

export default EventJobEditToolbar

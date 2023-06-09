import { Toolbar, SaveButton } from 'react-admin'

const App_sectionEditToolbar = (props: object) => (
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

export default App_sectionEditToolbar

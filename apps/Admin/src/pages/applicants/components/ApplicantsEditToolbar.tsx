import { Toolbar, SaveButton } from 'react-admin'

const ApplicantsEditToolbar = (props: object) => (
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

export default ApplicantsEditToolbar

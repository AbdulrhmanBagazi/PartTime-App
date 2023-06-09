import { Toolbar, SaveButton } from 'react-admin'

const CompaniesEditToolbar = (props: object) => (
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

export default CompaniesEditToolbar

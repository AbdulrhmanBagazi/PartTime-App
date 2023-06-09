import { Create, SimpleForm, TextInput, required } from 'react-admin'

const App_sectionCreate = () => (
  <Create redirect="show" sx={{ maxWidth: 600 }}>
    <SimpleForm>
      <TextInput
        label="resources.app_section.fields.title"
        source="title"
        validate={[required()]}
        fullWidth
      />
      <TextInput
        label="resources.app_section.fields.title_en"
        source="title_en"
        validate={[required()]}
        fullWidth
      />
    </SimpleForm>
  </Create>
)

export default App_sectionCreate

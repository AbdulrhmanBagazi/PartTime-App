import { Create, SimpleForm, TextInput, required } from 'react-admin'

const CompaniesCreate = () => (
  <Create redirect="show" sx={{ maxWidth: 600 }}>
    <SimpleForm>
      <TextInput label="resources.Companies.create.name" source="name" validate={[required()]} fullWidth />
      <TextInput
        label="resources.Companies.create.contact"
        source="contact"
        validate={[required()]}
        fullWidth
      />
      <TextInput label="resources.Companies.create.email" source="email" validate={[required()]} fullWidth />
      <TextInput
        label="resources.Companies.create.password"
        source="password"
        validate={[required()]}
        type="password"
        fullWidth
      />
    </SimpleForm>
  </Create>
)

export default CompaniesCreate

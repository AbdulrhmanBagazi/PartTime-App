import {
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  SelectInput,
  useLocaleState,
} from 'react-admin'

const EventCreate = () => {
  const [locale] = useLocaleState()

  return (
    <Create redirect="show" sx={{ maxWidth: 600 }}>
      <SimpleForm>
        <ReferenceInput source="companyId" reference="Companies">
          <SelectInput validate={required()} fullWidth optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="locationId" reference="Location">
          <SelectInput validate={required()} optionText={locale === 'en' ? 'title_en' : 'title'} fullWidth />
        </ReferenceInput>
        <TextInput label="resources.Event.fields.title" source="title" validate={[required()]} fullWidth />
        <TextInput
          label="resources.Event.fields.content"
          source="content"
          validate={[required()]}
          fullWidth
        />

        <TextInput
          label="resources.Event.fields.title_en"
          source="title_en"
          validate={[required()]}
          fullWidth
        />
        <TextInput
          label="resources.Event.fields.content_en"
          source="content_en"
          validate={[required()]}
          fullWidth
        />

        <TextInput
          label="resources.Event.fields.image_url"
          source="image_url"
          validate={[required()]}
          fullWidth
        />
        <TextInput
          label="resources.Event.fields.location_url"
          source="location_url"
          validate={[required()]}
          fullWidth
        />
      </SimpleForm>
    </Create>
  )
}

export default EventCreate

import {
  Create,
  SimpleForm,
  TextInput,
  required,
  SelectInput,
  NumberInput,
  ReferenceInput,
  useLocaleState,
} from 'react-admin'

const EventJobCreate = () => {
  const [locale] = useLocaleState()

  return (
    <Create redirect="show" sx={{ maxWidth: 600 }}>
      <SimpleForm>
        <ReferenceInput source="companyId" reference="Companies">
          <SelectInput validate={required()} fullWidth disabled />
        </ReferenceInput>
        <ReferenceInput source="eventId" reference="Event" label="resources.eventjob.fields.eventId">
          <SelectInput
            validate={required()}
            optionText={locale === 'en' ? 'title_en' : 'title'}
            fullWidth
            disabled
          />
        </ReferenceInput>
        <TextInput label="resources.eventjob.fields.title" source="title" validate={[required()]} fullWidth />
        <TextInput
          label="resources.eventjob.fields.title_en"
          source="title_en"
          validate={[required()]}
          fullWidth
        />
        <SelectInput
          source="status"
          label="resources.eventjob.fields.status"
          choices={[
            { id: 'OPEN', name: 'resources.eventjob.status.OPEN' },
            { id: 'CLOSED', name: 'resources.eventjob.status.CLOSED' },
          ]}
          optionText="name"
          validate={[required()]}
          fullWidth
        />
        <NumberInput label="resources.eventjob.fields.rate" source="rate" validate={[required()]} fullWidth />
        <SelectInput
          source="rate_type"
          label="resources.eventjob.fields.rate_type"
          choices={[
            // { id: 'MONTHLY', name: 'resources.eventjob.rate_type.MONTHLY' },
            { id: 'DAY', name: 'resources.eventjob.rate_type.DAY' },
          ]}
          optionText="name"
          validate={[required()]}
          fullWidth
        />
      </SimpleForm>
    </Create>
  )
}

export default EventJobCreate

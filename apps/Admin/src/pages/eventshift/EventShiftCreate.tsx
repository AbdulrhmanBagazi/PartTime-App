import {
  Create,
  SimpleForm,
  required,
  SelectInput,
  ReferenceInput,
  useLocaleState,
  TimeInput,
} from 'react-admin'

const EventShiftCreate = () => {
  const [locale] = useLocaleState()

  return (
    <Create redirect="show" sx={{ maxWidth: 600 }}>
      <SimpleForm>
        <ReferenceInput source="companyId" reference="Companies">
          <SelectInput validate={required()} fullWidth disabled />
        </ReferenceInput>
        <ReferenceInput source="eventId" reference="Event" label="resources.eventshift.fields.eventId">
          <SelectInput
            validate={required()}
            optionText={locale === 'en' ? 'title_en' : 'title'}
            fullWidth
            disabled
          />
        </ReferenceInput>
        <TimeInput
          label="resources.eventshift.fields.start_time"
          source="start_time"
          validate={[required()]}
          fullWidth
        />
        <TimeInput
          label="resources.eventshift.fields.end_time"
          source="end_time"
          validate={[required()]}
          fullWidth
        />
        <SelectInput
          source="status"
          label="resources.eventshift.fields.status"
          choices={[
            { id: 'OPEN', name: 'resources.eventshift.status.OPEN' },
            { id: 'CLOSED', name: 'resources.eventshift.status.CLOSED' },
          ]}
          optionText="name"
          validate={[required()]}
          fullWidth
        />
      </SimpleForm>
    </Create>
  )
}

export default EventShiftCreate

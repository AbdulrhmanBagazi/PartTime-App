import { NullableBooleanInput, ReferenceInput, SelectInput } from 'react-admin'

const EventListFilters = (val: string) => [
  <ReferenceInput
    source="companyId"
    reference="Companies"
    label="resources.eventjob.fields.companyId"
    alwaysOn>
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
  <SelectInput
    source="status"
    choices={[
      { id: 'SOON', name: 'resources.Event.status.soon' },
      { id: 'ACTIVE', name: 'resources.Event.status.active' },
      { id: 'COMPLETED', name: 'resources.Event.status.completed' },
    ]}
    optionText="name"
  />,
  <ReferenceInput source="locationId" reference="Location" label="resources.Event.fields.location_title">
    <SelectInput
      optionText={val === 'en' ? 'title_en' : 'title'}
      label="resources.Event.fields.location_title"
      fullWidth
    />
  </ReferenceInput>,
  <NullableBooleanInput source="published" />,
]

export default EventListFilters

import { ReferenceInput, SelectInput } from 'react-admin'

const ApplicantsListFilters = (language: string) => [
  <ReferenceInput source="eventId" reference="Event" label="resources.applicants.fields.eventId" alwaysOn>
    <SelectInput optionText={language === 'en' ? 'title_en' : 'title'} fullWidth />
  </ReferenceInput>,
]

export default ApplicantsListFilters

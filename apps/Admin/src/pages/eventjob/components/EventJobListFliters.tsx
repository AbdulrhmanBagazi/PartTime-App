import { ReferenceInput, SelectInput } from 'react-admin'

const EventJobListFliters = [
  <SelectInput
    source="status"
    choices={[
      { id: 'OPEN', name: 'resources.eventjob.status.OPEN' },
      { id: 'CLOSED', name: 'resources.eventjob.status.CLOSED' },
    ]}
    optionText="name"
  />,
  // <SelectInput
  //   source="rate_type"
  //   choices={[
  //     // { id: 'MONTHLY', name: 'resources.eventjob.rate_type.MONTHLY' },
  //     { id: 'DAY', name: 'resources.eventjob.rate_type.DAY' },
  //   ]}
  //   optionText="name"
  // />,
  <ReferenceInput source="eventId" reference="Event" label="resources.eventjob.fields.eventId" alwaysOn>
    <SelectInput optionText="title" fullWidth />
  </ReferenceInput>,
  <ReferenceInput source="companyId" reference="Companies" label="resources.eventjob.fields.companyId">
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
]

const EventJobListFlitersEn = [
  <SelectInput
    source="status"
    choices={[
      { id: 'OPEN', name: 'resources.eventjob.status.OPEN' },
      { id: 'CLOSED', name: 'resources.eventjob.status.CLOSED' },
    ]}
    optionText="name"
  />,
  // <SelectInput
  //   source="rate_type"
  //   choices={[
  //     // { id: 'MONTHLY', name: 'resources.eventjob.rate_type.MONTHLY' },
  //     { id: 'DAY', name: 'resources.eventjob.rate_type.DAY' },
  //   ]}
  //   optionText="name"
  // />,
  <ReferenceInput source="eventId" reference="Event" label="resources.eventjob.fields.eventId" alwaysOn>
    <SelectInput optionText="title_en" fullWidth />
  </ReferenceInput>,
  <ReferenceInput source="companyId" reference="Companies" label="resources.eventjob.fields.companyId">
    <SelectInput optionText="name" fullWidth />
  </ReferenceInput>,
]

export { EventJobListFliters, EventJobListFlitersEn }

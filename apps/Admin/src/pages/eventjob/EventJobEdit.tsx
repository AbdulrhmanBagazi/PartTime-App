import {
  Edit,
  TabbedForm,
  FormTab,
  Loading,
  useRefresh,
  useGetOne,
  TextInput,
  SelectInput,
  NumberInput,
  required,
  ReferenceInput,
  useLocaleState,
} from 'react-admin'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'
import EventJobEditToolbar from './components/EventJobEditToolbar'

const EventJobEdit = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'eventjob',
    { id },
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )
  const refresh = useRefresh()
  const [locale] = useLocaleState()

  if (isLoading) return <Loading />

  if (!data) return <MyError onClick={() => refresh()} />

  return (
    <Edit
      mutationMode="pessimistic"
      sx={{ maxWidth: 600 }}
      redirect="show"
      queryOptions={{
        onError: (err) => {
          return null
        },
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }}>
      <TabbedForm toolbar={<EventJobEditToolbar />}>
        <FormTab label="resources.app_section.showtabs.edit">
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
          <TextInput
            label="resources.eventjob.fields.title"
            source="title"
            validate={[required()]}
            fullWidth
          />
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
          <NumberInput
            label="resources.eventjob.fields.rate"
            source="rate"
            validate={[required()]}
            fullWidth
          />
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
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}

export default EventJobEdit

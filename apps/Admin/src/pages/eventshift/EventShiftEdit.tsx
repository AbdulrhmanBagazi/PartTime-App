import {
  Edit,
  TabbedForm,
  FormTab,
  Loading,
  useRefresh,
  useGetOne,
  SelectInput,
  required,
  ReferenceInput,
  useLocaleState,
  TimeInput,
} from 'react-admin'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'
import EventShiftEditToolbar from './components/EventShiftEditToolbar'

const EventShiftEdit = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'eventshift',
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
      <TabbedForm toolbar={<EventShiftEditToolbar />}>
        <FormTab label="resources.eventshift.showtabs.edit">
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
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}

export default EventShiftEdit

import {
  Edit,
  TabbedForm,
  FormTab,
  Loading,
  useRefresh,
  useGetOne,
  SelectInput,
  required,
  useLocaleState,
  TimeInput,
} from 'react-admin'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'
import ApplicantsEditToolbar from './components/ApplicantsEditToolbar'

const ApplicantsEdit = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'applicants',
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
      <TabbedForm toolbar={<ApplicantsEditToolbar />}>
        <FormTab label="resources.eventshift.showtabs.edit">
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

export default ApplicantsEdit

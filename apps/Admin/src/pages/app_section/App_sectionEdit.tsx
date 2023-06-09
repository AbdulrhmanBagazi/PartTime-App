import {
  Edit,
  TabbedForm,
  FormTab,
  Loading,
  useRefresh,
  useGetOne,
  TextInput,
  BooleanInput,
} from 'react-admin'
import AppsectionEditToolbar from './components/App_sectionEditToolbar'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'

const App_sectionEdit = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'app_section',
    { id },
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )
  const refresh = useRefresh()

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
      <TabbedForm toolbar={<AppsectionEditToolbar />}>
        <FormTab label="resources.app_section.showtabs.edit">
          <TextInput label="resources.app_section.fields.title" source="title" fullWidth />
          <TextInput label="resources.app_section.fields.title_en" source="title_en" fullWidth />
          <BooleanInput label="resources.app_section.fields.published" source="published" fullWidth />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}

export default App_sectionEdit

import {
  BooleanInput,
  Edit,
  TabbedForm,
  FormTab,
  Loading,
  useRefresh,
  useGetOne,
  TextInput,
} from 'react-admin'
import CompaniesEditToolbar from './components/CompaniesEditToolbar'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'

const CompaniesEdit = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'Companies',
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
      redirect="show"
      sx={{ maxWidth: 600 }}
      queryOptions={{
        onError: (err) => {
          return null
        },
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }}>
      <TabbedForm toolbar={<CompaniesEditToolbar />}>
        <FormTab label="resources.Companies.showtabs.edit">
          <TextInput label="resources.Companies.fields.name" source="name" fullWidth />
          <TextInput label="resources.Companies.fields.contact" source="contact" fullWidth />
          <TextInput label="resources.Companies.fields.email" source="email" fullWidth />
          <TextInput label="resources.Companies.fields.logo_url" source="logo_url" fullWidth />
          <BooleanInput label="resources.Companies.fields.suspended" source="suspended" fullWidth />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}

export default CompaniesEdit

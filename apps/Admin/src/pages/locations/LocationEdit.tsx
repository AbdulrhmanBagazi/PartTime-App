import { Edit, TabbedForm, FormTab, Loading, useRefresh, useGetOne, TextInput } from 'react-admin'
import LocationEditToolbar from './components/LocationEditToolbar'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'

const LocationEdit = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'Location',
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
      <TabbedForm toolbar={<LocationEditToolbar />}>
        <FormTab label="resources.Location.showtabs.edit">
          <TextInput label="resources.Location.fields.title" source="title" fullWidth />
          <TextInput label="resources.Location.fields.title_en" source="title_en" fullWidth />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}

export default LocationEdit

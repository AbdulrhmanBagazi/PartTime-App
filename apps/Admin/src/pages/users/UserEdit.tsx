import { BooleanInput, Edit, TabbedForm, FormTab, Loading, useRefresh, useGetOne } from 'react-admin'
import UserEditToolbar from './components/UserEditToolbar'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'

const UserEdit = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'User',
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
      // redirect={false}
      // actions={false}
      queryOptions={{
        onError: (err) => {
          return null
        },
        // useErrorBoundary: (err) => {
        //   return true
        // },
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }}>
      <TabbedForm toolbar={<UserEditToolbar />}>
        <FormTab label="resources.User.showtabs.edit">
          <BooleanInput label="resources.User.fields.suspended" source="suspended" fullWidth />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
}

export default UserEdit

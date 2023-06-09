import {
  Datagrid,
  TextField,
  SimpleList,
  DateField,
  List,
  useGetList,
  Loading,
  useRefresh,
  ChipField,
  BooleanField,
} from 'react-admin'
import { useMediaQuery, Theme } from '@mui/material'
import SuspendedBooleanField from './components/SuspendedBooleanField'
import UserListFilters from './components/UserListFilters'
import MyError from '../../layout/MyError'

const UserList = () => {
  const { data, isLoading } = useGetList(
    'User',
    {},
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const refresh = useRefresh()

  if (isLoading) return <Loading />

  if (!data) return <MyError onClick={() => refresh()} />

  return (
    <List
      // debounce={3000}
      filters={UserListFilters}
      exporter={false}
      perPage={10}
      emptyWhileLoading
      queryOptions={{
        onError: (err) => {
          return null
        },
        // useErrorBoundary: (err) => {
        //   return true
        // },
      }}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.email}
          secondaryText={(record) => record.Type}
          linkType="show"
        />
      ) : (
        <Datagrid isRowSelectable={() => false} bulkActionButtons={false} rowClick="show">
          {/* <TextField source="id" sortable={false} /> */}
          <TextField source="email" />
          <BooleanField source="verfied" />
          <SuspendedBooleanField source="suspended" />
          <ChipField source="Type" size="small" />
          <DateField source="createdAt" />
        </Datagrid>
      )}
    </List>
  )
}

export default UserList

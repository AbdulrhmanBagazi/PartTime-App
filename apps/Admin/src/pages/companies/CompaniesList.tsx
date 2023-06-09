import {
  Datagrid,
  TextField,
  SimpleList,
  DateField,
  List,
  useGetList,
  Loading,
  useRefresh,
  ImageField,
} from 'react-admin'
import { useMediaQuery, Theme } from '@mui/material'
import MyError from '../../layout/MyError'
import CompaniesListActions from './components/CompaniesListActions'
import SuspendedBooleanField from './components/SuspendedBooleanField'

const CompaniesList = () => {
  const { data, isLoading } = useGetList(
    'Companies',
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
      // filters={CompaniesListFilters}
      actions={<CompaniesListActions />}
      exporter={false}
      perPage={10}
      emptyWhileLoading
      queryOptions={{
        onError: (err) => {
          return null
        },
      }}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.email}
          linkType="show"
        />
      ) : (
        <Datagrid isRowSelectable={() => false} bulkActionButtons={false} rowClick="show">
          <ImageField
            sortable={false}
            source="logo_url"
            title="logo_url"
            sx={{ '& img': { maxWidth: 50, maxHeight: 50, objectFit: 'contain' } }}
          />
          {/* <TextField source="id" sortable={false} /> */}
          <TextField source="name" />
          <TextField source="email" />
          <TextField source="contact" />
          <SuspendedBooleanField source="suspended" />
          <DateField source="createdAt" />
        </Datagrid>
      )}
    </List>
  )
}

export default CompaniesList

import {
  Datagrid,
  TextField,
  SimpleList,
  DateField,
  List,
  useGetList,
  Loading,
  useRefresh,
  useLocaleState,
  BooleanField,
} from 'react-admin'
import { useMediaQuery, Theme } from '@mui/material'
import MyError from '../../layout/MyError'
import App_sectionListFliters from './components/App_sectionListFliters'

const App_sectionList = () => {
  const { data, isLoading } = useGetList(
    'app_section',
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
  const [locale] = useLocaleState()

  if (isLoading) return <Loading />

  if (!data) return <MyError onClick={() => refresh()} />

  return (
    <List
      exporter={false}
      emptyWhileLoading
      filters={App_sectionListFliters}
      perPage={10}
      queryOptions={{
        onError: (err) => {
          return null
        },
      }}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => (locale === 'en' ? record.title_en : record.title)}
          linkType="show"
        />
      ) : (
        <Datagrid isRowSelectable={() => false} bulkActionButtons={false}  rowClick="show">
          {/* <TextField source="id" sortable={false} /> */}
          <TextField source="title" />
          <TextField source="title_en" />
          <BooleanField source="published" />
          <DateField source="createdAt" />
        </Datagrid>
      )}
    </List>
  )
}

export default App_sectionList

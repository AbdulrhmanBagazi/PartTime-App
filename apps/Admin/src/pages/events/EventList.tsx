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
  ChipField,
} from 'react-admin'
import { useMediaQuery, Theme } from '@mui/material'
import SuspendedBooleanField from './components/SuspendedBooleanField'
import EventListFilters from './components/EventListFilters'
import MyError from '../../layout/MyError'

const EventList = () => {
  const { data, isLoading } = useGetList(
    'Event',
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
      filters={EventListFilters(locale)}
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
          primaryText={(record) => (locale === 'en' ? record.title_en : record.title)}
          secondaryText={() => <ChipField source="status" size="small" />}
          tertiaryText={() => <SuspendedBooleanField source="published" />}
          linkType="show"
        />
      ) : (
        <Datagrid isRowSelectable={() => false} bulkActionButtons={false} rowClick="show">
          {/* <TextField source="id" sortable={false} /> */}
          <TextField source="company.name" sortable={false} />
          <TextField source={locale === 'en' ? 'title_en' : 'title'} />
          <TextField source={locale === 'en' ? 'content_en' : 'content'} />
          <TextField
            source={locale === 'en' ? 'Location.title_en' : 'Location.title'}
            sortable={false}
            label="resources.Event.fields.location_title"
          />
          <ChipField source="status" size="small" />
          <SuspendedBooleanField source="published" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </Datagrid>
      )}
    </List>
  )
}

export default EventList

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
import MyError from '../../layout/MyError'
import { EventJobListFliters, EventJobListFlitersEn } from './components/EventJobListFliters'
import EventJobToolbar from './components/EventJobToolbar'

const EventJobList = () => {
  const { data, isLoading } = useGetList(
    'eventjob',
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
      hasCreate={false}
      emptyWhileLoading
      actions={<EventJobToolbar />}
      filters={locale === 'en' ? EventJobListFlitersEn : EventJobListFliters}
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
        <Datagrid isRowSelectable={() => false} bulkActionButtons={false} rowClick="show">
          {/* <TextField source="id" sortable={false} /> */}
          <TextField source="company.name" sortable={false} />
          <TextField source={locale === 'en' ? 'Event.title_en' : 'Event.title'} sortable={false} />
          <TextField source="title" />
          <TextField source="title_en" />
          <ChipField source="status" size="small" />
          <TextField source="rate" />
          <ChipField source="rate_type" size="small" />
          <DateField source="createdAt" />
        </Datagrid>
      )}
    </List>
  )
}

export default EventJobList

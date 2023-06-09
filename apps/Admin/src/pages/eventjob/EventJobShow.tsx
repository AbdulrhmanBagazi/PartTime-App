import {
  Labeled,
  DateField,
  TextField,
  Show,
  TabbedShowLayout,
  Tab,
  useGetOne,
  useRefresh,
  Loading,
  ChipField,
  useLocaleState,
} from 'react-admin'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'
import Grid from '@mui/material/Grid'
import EventJobShowToolBar from './components/EventJobShowToolBar'

const EventJobShow = () => {
  const [locale] = useLocaleState()
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'eventjob',
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
    <Show
      queryOptions={{
        onError: (err) => {
          return null
        },
      }}
      actions={<EventJobShowToolBar data={data} />}
      emptyWhileLoading>
      <TabbedShowLayout>
        <Tab label="resources.eventjob.showtabs.show">
          {/* <Labeled label="resources.app_section.fields.id">
            <TextField source="id" />
          </Labeled> */}

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.company.name">
                <TextField source="company.name" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.Event.title">
                <TextField source={locale === 'en' ? 'Event.title_en' : 'Event.title'} />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.status">
                <ChipField source="status" size="small" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.title">
                <TextField source="title" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.title_en">
                <TextField source="title_en" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.rate">
                <TextField source="rate" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.rate_type">
                <ChipField source="rate_type" size="small" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.createdAt">
                <DateField source="createdAt" />
              </Labeled>
            </Grid>
            <Grid item xs={4}>
              <Labeled label="resources.eventjob.fields.updatedAt">
                <DateField source="updatedAt" />
              </Labeled>
            </Grid>
          </Grid>
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

export default EventJobShow

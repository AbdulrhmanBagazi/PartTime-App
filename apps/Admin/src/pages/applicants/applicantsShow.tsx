import {
  Labeled,
  TextField,
  Show,
  FunctionField,
  TabbedShowLayout,
  Tab,
  useGetOne,
  useRefresh,
  Loading,
  useLocaleState,
  useTranslate,
  DateField,
  ChipField,
} from 'react-admin'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'
import Grid from '@mui/material/Grid'
import countries from 'i18n-iso-countries'
import moment from 'moment'
import Chip from '@mui/material/Chip'
import I18nTime from '../../components/I18nTime.apply'

const ApplicantsShow = () => {
  const { id } = useParams()
  const [locale] = useLocaleState()
  const translate = useTranslate()
  const { data, isLoading } = useGetOne(
    'applicants',
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
      emptyWhileLoading>
      <TabbedShowLayout>
        <Tab label="resources.applicants.showtabs.show">
          <Grid container spacing={2}>
            <Grid item xs>
              <Labeled label="resources.applicants.fields.event.title">
                <TextField source={locale === 'en' ? 'event.title_en' : 'event.title'} sortable={false} />
              </Labeled>
            </Grid>

            <Grid item xs>
              <Labeled label="resources.applicants.fields.name">
                <TextField source="name" />
              </Labeled>
            </Grid>

            <Grid item xs>
              <Labeled label="resources.applicants.fields.nationality">
                <FunctionField
                  source="nationality"
                  render={(record: any) => countries.getName(record.nationality, locale)}
                />
              </Labeled>
            </Grid>

            <Grid item xs>
              <Labeled label="resources.applicants.fields.nationalID">
                <TextField source="nationalID" />
              </Labeled>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs>
              <Labeled label="resources.applicants.fields.gender">
                {locale === 'en' ? (
                  <FunctionField source="gender" render={(record: any) => record.gender} />
                ) : (
                  <FunctionField
                    source="gender"
                    render={(record: any) => (record.gender === 'male' ? 'ذكر' : 'انثى')}
                  />
                )}
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.applicants.fields.age">
                <FunctionField
                  label="resources.applicants.fields.age"
                  render={(record: any) => moment().diff(record.dateOfBirth, 'years')}
                />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.applicants.fields.contact.phone">
                <TextField source="contact.phone" sortable={false} />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.applicants.fields.contact.whatsapp">
                <TextField source="contact.whatsapp" sortable={false} />
              </Labeled>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <Labeled label="resources.applicants.fields.status">
                <FunctionField
                  source="status"
                  render={(record: any) => <Chip label={translate(record.status)} />}
                />
              </Labeled>
            </Grid>

            <Grid item>
              <Labeled label="resources.applicants.fields.start_date">
                <DateField source="start_date" />
              </Labeled>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs>
              <Labeled label="resources.eventjob.fields.title">
                <TextField source={locale === 'en' ? 'job.title_en' : 'job.title'} />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.eventjob.fields.rate">
                <TextField source="job.rate" />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.eventjob.fields.rate_type">
                <ChipField source="job.rate_type" size="small" />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.eventshift.fields.start_time">
                <FunctionField
                  source="shift.start_time"
                  render={(record: any) => <I18nTime time={record.shift.start_time} Language={locale} />}
                />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.eventshift.fields.end_time">
                <FunctionField
                  source="shift.end_time"
                  render={(record: any) => <I18nTime time={record.shift.end_time} Language={locale} />}
                />
              </Labeled>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <Labeled label="resources.applicants.fields.createdAt">
                <DateField source="createdAt" />
              </Labeled>
            </Grid>
            <Grid item>
              <Labeled label="resources.applicants.fields.updatedAt">
                <DateField source="updatedAt" />
              </Labeled>
            </Grid>
          </Grid>
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

export default ApplicantsShow

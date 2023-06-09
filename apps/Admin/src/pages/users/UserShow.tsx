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
  WithRecord,
  FunctionField,
  useLocaleState,
  BooleanField,
} from 'react-admin'
import SuspendedBooleanField from './components/SuspendedBooleanField'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'
import moment from 'moment'
import countries from 'i18n-iso-countries'
import Grid from '@mui/material/Grid'

const UserShow = () => {
  const [locale] = useLocaleState()
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
    <Show
      queryOptions={{
        onError: (err) => {
          return null
        },
      }}
      emptyWhileLoading>
      <TabbedShowLayout>
        <Tab label="resources.User.showtabs.show">
          {/* <Labeled label="resources.User.fields.id">
            <TextField source="id" />
          </Labeled> */}
          <Grid container spacing={2}>
            <Grid item xs>
              <Labeled label="resources.User.fields.email">
                <TextField source="email" />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.User.fields.Type">
                <TextField source="Type" />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.User.fields.createdAt">
                <DateField source="createdAt" />
              </Labeled>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Labeled label="resources.User.fields.verfied">
                <BooleanField source="verfied" />
              </Labeled>
            </Grid>
            <Grid item>
              <Labeled label="resources.User.fields.suspended">
                <SuspendedBooleanField source="suspended" />
              </Labeled>
            </Grid>
          </Grid>
        </Tab>

        <Tab label="resources.User.showtabs.profile">
          <WithRecord
            render={(record) =>
              record.Profile ? (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.firstName">
                        <FunctionField render={(record: any) => record.Profile.firstName} />
                      </Labeled>
                    </Grid>

                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.lastName">
                        <FunctionField render={(record: any) => record.Profile.lastName} />
                      </Labeled>
                    </Grid>

                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.nationality">
                        <FunctionField
                          render={(record: any) => countries.getName(record.Profile.nationality, locale)}
                        />
                      </Labeled>
                    </Grid>
                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.nationalID">
                        <FunctionField render={(record: any) => record.Profile.nationalID} />
                      </Labeled>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.gender">
                        {locale === 'en' ? (
                          <FunctionField render={(record: any) => record.Profile.gender} />
                        ) : (
                          <FunctionField
                            render={(record: any) => (record.Profile.gender === 'male' ? 'ذكر' : 'انثى')}
                          />
                        )}
                      </Labeled>
                    </Grid>

                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.dateOfBirth">
                        <DateField source="Profile.dateOfBirth" />
                      </Labeled>
                    </Grid>

                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.age">
                        <FunctionField
                          render={(record: any) => moment().diff(record.Profile.dateOfBirth, 'years')}
                        />
                      </Labeled>
                    </Grid>
                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.createdAt">
                        <DateField source="Profile.createdAt" />
                      </Labeled>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Labeled label="resources.User.fields.Profile.whatsapp">
                        <FunctionField render={(record: any) => record.Profile.whatsapp} />
                      </Labeled>
                    </Grid>

                    <Grid item xs>
                      <Labeled label="resources.User.fields.Profile.phone">
                        <FunctionField render={(record: any) => record.Profile.phone} />
                      </Labeled>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Labeled label="resources.User.fields.Profile.null">
                  <FunctionField render={(_record: any) => ''} />
                </Labeled>
              )
            }
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

export default UserShow

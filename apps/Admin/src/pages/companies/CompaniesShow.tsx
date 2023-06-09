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
  ReferenceManyField,
  Pagination,
  Datagrid,
  useLocaleState,
  ImageField,
  ChipField,
} from 'react-admin'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'
import SuspendedBooleanField from './components/SuspendedBooleanField'
import SuspendedBooleanFieldEvents from './components/SuspendedBooleanFieldEvents'
import Grid from '@mui/material/Grid'

const CompaniesShow = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'Companies',
    { id },
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )
  const refresh = useRefresh()
  const [locale] = useLocaleState()

  if (isLoading) return <Loading />

  if (!data) return <MyError onClick={() => refresh()} />
  return (
    <Show
      queryOptions={{
        onError: (err) => {
          return null
        },
        // useErrorBoundary: (err) => {
        //   return true
        // },
      }}
      emptyWhileLoading>
      <TabbedShowLayout>
        <Tab label="resources.Companies.showtabs.show">
          {/* <Labeled label="resources.Companies.fields.id">
            <TextField source="id" />
          </Labeled> */}

          <Grid container spacing={2}>
            <Grid item xs>
              <Labeled label="resources.Companies.fields.name">
                <TextField source="name" />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.Companies.fields.contact">
                <TextField source="contact" />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.Companies.fields.email">
                <TextField source="email" />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.Companies.fields.createdAt">
                <DateField source="createdAt" />
              </Labeled>
            </Grid>
            <Grid item xs>
              <Labeled label="resources.Companies.fields.suspended">
                <SuspendedBooleanField source="suspended" />
              </Labeled>
            </Grid>
          </Grid>
          <Labeled label="resources.Companies.fields.logo_url">
            <ImageField
              source="logo_url"
              title="logo_url"
              sx={{ '& img': { maxWidth: 150, maxHeight: 150, objectFit: 'contain' } }}
            />
          </Labeled>
        </Tab>
        <Tab label="resources.Companies.showtabs.Events">
          <ReferenceManyField
            pagination={<Pagination />}
            label=""
            reference="CompaniesEvents"
            target="companyId"
            perPage={5}>
            <Datagrid
              isRowSelectable={() => false}
              bulkActionButtons={false}
              rowClick="show"
              resource="Event">
              {/* <TextField source="id" sortable={false} /> */}
              <TextField
                source={locale === 'en' ? 'title_en' : 'title'}
                label="resources.Companies.Events.title"
              />
              <TextField
                source={locale === 'en' ? 'content_en' : 'content'}
                label="resources.Companies.Events.content"
              />
              <ChipField source="status" size="small" />
              <SuspendedBooleanFieldEvents source="published" label="resources.Companies.Events.published" />
              <DateField source="createdAt" label="resources.Companies.Events.createdAt" />
              <DateField source="updatedAt" label="resources.Companies.Events.updatedAt" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

export default CompaniesShow

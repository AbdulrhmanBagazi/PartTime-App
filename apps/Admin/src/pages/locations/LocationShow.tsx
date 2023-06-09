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
  ChipField,
} from 'react-admin'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'

const LocationShow = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'Location',
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
      }}
      emptyWhileLoading>
      <TabbedShowLayout>
        <Tab label="resources.Location.showtabs.show">
          {/* <Labeled label="resources.Location.fields.id">
            <TextField source="id" />
          </Labeled> */}
          <Labeled label="resources.Location.fields.createdAt">
            <DateField source="createdAt" />
          </Labeled>
          <Labeled label="resources.Location.fields.updatedAt">
            <DateField source="updatedAt" />
          </Labeled>

          <Labeled label="resources.Location.fields.title">
            <TextField source="title" />
          </Labeled>

          <Labeled label="resources.Location.fields.title_en">
            <TextField source="title_en" />
          </Labeled>
        </Tab>
        <Tab label="resources.Companies.showtabs.Events">
          <ReferenceManyField
            pagination={<Pagination />}
            label=""
            reference="LocationEvents"
            target="locationId"
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
              <ChipField source="status" label="resources.Companies.Events.status" size="small" />
              <DateField source="createdAt" label="resources.Companies.Events.createdAt" />
              {/* <DateField source="createdAt" label="resources.Companies.Events.createdAt" />
              <DateField source="updatedAt" label="resources.Companies.Events.updatedAt" /> */}
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

export default LocationShow

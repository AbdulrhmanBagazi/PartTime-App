import {
  BooleanInput,
  Edit,
  TabbedForm,
  FormTab,
  Loading,
  useRefresh,
  useGetOne,
  SelectInput,
  TextInput,
  ReferenceInput,
  useLocaleState,
  required,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin'
import EventEditToolbar from './components/EventEditToolbar'
import { useParams } from 'react-router-dom'
import MyError from '../../layout/MyError'
import {
  RichTextInput,
  RichTextInputToolbar,
  ListButtons,
  LevelSelect,
  FormatButtons,
} from 'ra-input-rich-text'
import 'react-day-picker/dist/style.css'
import { FormProvider, useForm } from 'react-hook-form'
import MyDaysPicker from './components/DatePicker'

const EventEdit = () => {
  const methods = useForm()
  const [locale] = useLocaleState()
  const { id } = useParams()
  const { data, isLoading } = useGetOne(
    'Event',
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
    <FormProvider {...methods}>
      <Edit
        mutationMode="pessimistic"
        redirect="show"
        // redirect={false}
        // sx={{ maxWidth: 600 }}
        queryOptions={{
          onError: (err) => {
            return null
          },
          refetchOnReconnect: true,
          refetchOnMount: true,
          refetchOnWindowFocus: true,
        }}>
        <TabbedForm toolbar={<EventEditToolbar />}>
          <FormTab label="resources.Event.edittabs.editinfo">
            <ReferenceInput source="app_sectionId" reference="app_section">
              <SelectInput
                validate={required()}
                optionText={locale === 'en' ? 'title_en' : 'title'}
                fullWidth
              />
            </ReferenceInput>
            <ReferenceInput source="locationId" reference="Location">
              <SelectInput
                validate={required()}
                optionText={locale === 'en' ? 'title_en' : 'title'}
                fullWidth
              />
            </ReferenceInput>
            <TextInput label="resources.Event.fields.title" source="title" fullWidth validate={required()} />
            <TextInput
              label="resources.Event.fields.content"
              source="content"
              fullWidth
              validate={required()}
            />
            <TextInput
              label="resources.Event.fields.title_en"
              source="title_en"
              fullWidth
              validate={required()}
            />
            <TextInput
              label="resources.Event.fields.content_en"
              source="content_en"
              fullWidth
              validate={required()}
            />
            <TextInput
              label="resources.Event.fields.image_url"
              source="image_url"
              fullWidth
              validate={required()}
            />
            <TextInput
              label="resources.Event.fields.location_url"
              source="location_url"
              fullWidth
              validate={required()}
            />
            <SelectInput
              source="status"
              label="resources.Event.fields.status"
              choices={[
                { id: 'SOON', name: 'resources.Event.status.soon' },
                { id: 'ACTIVE', name: 'resources.Event.status.active' },
                { id: 'COMPLETED', name: 'resources.Event.status.completed' },
              ]}
              optionText="name"
              fullWidth
              validate={required()}
            />
            <BooleanInput
              label="resources.Event.fields.published"
              source="published"
              fullWidth
              validate={required()}
            />
          </FormTab>
          <FormTab label="resources.Event.edittabs.editdetails">
            <ArrayInput source="details" fullWidth>
              <SimpleFormIterator fullWidth>
                <TextInput
                  source="title"
                  helperText={false}
                  label="resources.Event.fields.title"
                  fullWidth
                  validate={required()}
                />
                <RichTextInput
                  validate={required()}
                  fullWidth
                  toolbar={
                    <RichTextInputToolbar size="large">
                      <LevelSelect />
                      <FormatButtons />
                      <ListButtons />
                    </RichTextInputToolbar>
                  }
                  source="content"
                  label="resources.Event.fields.content"
                />
              </SimpleFormIterator>
            </ArrayInput>
          </FormTab>
          <FormTab label="resources.Event.edittabs.editdetails_en">
            <ArrayInput source="details_en" fullWidth>
              <SimpleFormIterator fullWidth>
                <TextInput
                  source="title"
                  helperText={false}
                  label="resources.Event.fields.title"
                  fullWidth
                  validate={required()}
                />
                <RichTextInput
                  validate={required()}
                  fullWidth
                  toolbar={
                    <RichTextInputToolbar size="large">
                      <LevelSelect />
                      <FormatButtons />
                      <ListButtons />
                    </RichTextInputToolbar>
                  }
                  source="content"
                  label="resources.Event.fields.content"
                />
              </SimpleFormIterator>
            </ArrayInput>
          </FormTab>

          <FormTab label="resources.Event.edittabs.editdays">
            <MyDaysPicker data={data} />
          </FormTab>
        </TabbedForm>
      </Edit>
    </FormProvider>
  )
}

export default EventEdit

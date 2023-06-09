import 'react-day-picker/dist/style.css'
import {
  Create,
  SimpleForm,
  required,
  SelectInput,
  ReferenceInput,
  useLocaleState,
  ArrayInput,
  SimpleFormIterator,
  TextInput,
} from 'react-admin'
import { DayPicker } from 'react-day-picker'
import ar from 'date-fns/locale/ar'
import en from 'date-fns/locale/en-US'
import { useState } from 'react'

const EventDayCreate = () => {
  const [locale] = useLocaleState()
  const initialDays: Date[] = []
  const [days, setDays] = useState<Date[] | undefined>(initialDays)

  return (
    <Create redirect="show" sx={{ maxWidth: 600 }}>
      <SimpleForm>
        <ReferenceInput source="eventId" reference="Event" label="resources.eventjob.fields.eventId">
          <SelectInput
            validate={required()}
            optionText={locale === 'en' ? 'title_en' : 'title'}
            fullWidth
            disabled
          />
        </ReferenceInput>

        <DayPicker
          dir="ltr"
          mode="multiple"
          locale={locale === 'en' ? en : ar}
          selected={days}
          onSelect={setDays}
        />

        <ArrayInput source="days" fullWidth>
          <SimpleFormIterator fullWidth disableAdd>
            <TextInput
              source="title"
              helperText={false}
              label="resources.Event.fields.title"
              fullWidth
              validate={required()}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  )
}

export default EventDayCreate

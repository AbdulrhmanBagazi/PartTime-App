import * as React from 'react'
import { Fragment } from 'react'
import {
  Datagrid,
  TextField,
  // DateField,
  FunctionField,
  useListContext,
  useLocaleState,
  useTranslate,
  List,
  Loading,
  useRefresh,
} from 'react-admin'
import { useMediaQuery, Divider, Tabs, Tab, Theme } from '@mui/material'
import countries from 'i18n-iso-countries'
import moment from 'moment'
import Chip from '@mui/material/Chip'
import MyError from '../../layout/MyError'
import ApplicantsListFilters from './components/ApplicantsListFilters'
import Mobile from './components/Mobile'
import ApplicantsListAside from './components/ApplicantsListAside'

const tabs = [
  { id: 'PENDING', name: 'PENDING' },
  { id: 'CANCELED', name: 'CANCELED' },
  { id: 'DECLINED', name: 'DECLINED' },
  { id: 'WAITLIST', name: 'WAITLIST' },
  { id: 'INTERVIEW', name: 'INTERVIEW' },
  { id: 'APPROVED', name: 'APPROVED' },
  { id: 'COMPLETED', name: 'COMPLETED' },
]

const TabbedDatagrid = () => {
  const listContext = useListContext()
  const { setFilters, isLoading, data, filterValues } = listContext
  const [locale] = useLocaleState()
  const translate = useTranslate()
  const refresh = useRefresh()
  const isXSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilters(
      { ...filterValues, status: newValue },
      {},
      false // no debounce, we want the filter to fire immediately
    )
  }

  if (isLoading) return <Loading />

  if (!data) return <MyError onClick={() => refresh()} />

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status}
        indicatorColor="primary"
        onChange={handleChange}>
        {tabs.map((choice, i) => (
          <Tab key={i} label={translate(choice.name)} value={choice.id} />
        ))}
      </Tabs>
      {isXSmall ? (
        <Mobile />
      ) : (
        <>
          <Divider />
          <Datagrid isRowSelectable={() => false} bulkActionButtons={false} rowClick="show">
            {/* <TextField source="id" sortable={false} /> */}
            <TextField source={locale === 'en' ? 'event.title_en' : 'event.title'} sortable={false} />
            <TextField source="name" />
            <FunctionField
              source="nationality"
              render={(record: any) => countries.getName(record.nationality, locale)}
            />
            <TextField source="nationalID" />
            <FunctionField
              label="resources.applicants.fields.age"
              render={(record: any) => moment().diff(record.dateOfBirth, 'years')}
            />
            {locale === 'en' ? (
              <FunctionField source="gender" render={(record: any) => record.gender} />
            ) : (
              <FunctionField
                source="gender"
                render={(record: any) => (record.gender === 'male' ? 'ذكر' : 'انثى')}
              />
            )}
            <FunctionField
              source="status"
              render={(record: any) => <Chip label={translate(record.status)} />}
            />
            {/* <TextField source="contact.phone" sortable={false} />
            <TextField source="contact.whatsapp" sortable={false} />
            <DateField source="createdAt" />
            <DateField source="updatedAt" /> */}
          </Datagrid>
        </>
      )}
    </Fragment>
  )
}

const ApplicantsList = () => {
  const [locale] = useLocaleState()

  return (
    <List
      filterDefaultValues={{ status: 'PENDING' }}
      filters={ApplicantsListFilters(locale)}
      sort={{ field: 'createdAt', order: 'DESC' }}
      aside={<ApplicantsListAside />}
      perPage={25}>
      <TabbedDatagrid />
    </List>
  )
}

export default ApplicantsList

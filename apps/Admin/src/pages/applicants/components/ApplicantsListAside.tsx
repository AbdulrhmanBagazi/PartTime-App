import { Card, CardContent } from '@mui/material'
import { useEffect } from 'react'
import { FilterList, FilterListItem, useGetList, useLocaleState, useListContext } from 'react-admin'
import I18nTime from '../../../components/I18nTime.apply'
import { AvTimer, Work } from '../../../theme/icons'

const JobsAsideFilter = () => {
  const listContext = useListContext()
  const { filterValues } = listContext
  const [locale] = useLocaleState()
  const { data } = useGetList('eventjob', {
    pagination: { page: 1, perPage: 100 },
    filter: { eventId: filterValues.eventId },
    sort: { field: 'createdAt', order: 'ASC' },
  })

  return (
    <FilterList label="resources.applicants.fields.job" icon={<Work />}>
      {data &&
        data.map((record: any) => (
          <FilterListItem
            label={locale === 'en' ? record.title_en : record.title}
            key={record.id}
            value={{ jobId: record.id }}
          />
        ))}
    </FilterList>
  )
}

const ApplicantsListAside = () => {
  const listContext = useListContext()
  const { filterValues, setFilters } = listContext
  const [locale] = useLocaleState()
  const { data, isLoading } = useGetList('eventshift', {
    pagination: { page: 1, perPage: 100 },
    filter: { eventId: filterValues.eventId },
    sort: { field: 'createdAt', order: 'ASC' },
  })

  useEffect(() => {
    if (data) {
      if (data.length >= 1) {
        if (data[0].eventId === filterValues.eventId) {
          return
        }

        delete filterValues['shiftId']
        delete filterValues['jobId']

        setFilters(
          { ...filterValues, eventId: filterValues.eventId },
          {},
          false // no debounce, we want the filter to fire immediately
        )
        return
      }
      delete filterValues['shiftId']
      delete filterValues['jobId']

      setFilters(
        { ...filterValues, eventId: filterValues.eventId },
        {},
        false // no debounce, we want the filter to fire immediately
      )
      return
    }

    delete filterValues['shiftId']
    delete filterValues['jobId']

    setFilters(
      { ...filterValues, eventId: filterValues.eventId },
      {},
      false // no debounce, we want the filter to fire immediately
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues.eventId])

  if (isLoading || filterValues.eventId === undefined) {
    return null
  }

  return (
    <Card
      sx={{
        alignSelf: 'flex-start',
        marginTop: 9,
        marginRight: 2.5,
        marginLeft: 2.5,
        // width: 175,
      }}>
      <CardContent>
        <FilterList label="resources.applicants.fields.shift" icon={<AvTimer />}>
          {data &&
            data.map((record: any) => (
              <FilterListItem
                label={
                  <>
                    <I18nTime time={record.start_time} Language={locale} />
                    {locale === 'en' ? ' to ' : ' إلى '}
                    <I18nTime time={record.end_time} Language={locale} />
                  </>
                }
                key={record.id}
                value={{ shiftId: record.id }}
              />
            ))}
        </FilterList>
        <JobsAsideFilter />
      </CardContent>
    </Card>
  )
}

export default ApplicantsListAside

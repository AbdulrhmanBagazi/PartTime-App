import * as React from 'react'
import { Box, Card, CardHeader, CardContent, Typography } from '@mui/material'
import {
  FunctionField,
  EditButton,
  TextField,
  useListContext,
  RecordContextProvider,
  useLocaleState,
} from 'react-admin'
import countries from 'i18n-iso-countries'

const Mobile = () => {
  const { data, isLoading } = useListContext()
  const [locale] = useLocaleState()

  if (isLoading || data.length === 0) {
    return null
  }
  return (
    <Box margin="0.5em">
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Card sx={{ margin: '0.5rem 0' }}>
            <CardHeader
              title={<TextField source="name" variant="body1" />}
              titleTypographyProps={{ variant: 'body1' }}
              action={<EditButton />}
            />
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body2" gutterBottom>
                <TextField source={locale === 'en' ? 'event.title_en' : 'event.title'} sortable={false} />
              </Typography>
              <Typography variant="body2" gutterBottom>
                <FunctionField
                  source="nationality"
                  render={(record: any) => countries.getName(record.nationality, locale)}
                />
              </Typography>
            </CardContent>
          </Card>
        </RecordContextProvider>
      ))}
    </Box>
  )
}

export default Mobile

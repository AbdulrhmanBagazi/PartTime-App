import { useEffect, useState } from 'react'
import { Loading, Title, useDataProvider, useTranslate } from 'react-admin'
import TotalUsers from './components/TotalUsers'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { UserIcon, BusinessIcon, Festival, LocationOn, Article } from '../../theme/icons'
import MyError from '../../layout/MyError'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

type Data = {
  data: gqlresponse | undefined
}

type Applicantscount = {
  status: string
  _count: countStatus
}
type countStatus = {
  status: number
}

type gqlresponse = {
  Users_count: number
  Companies_count: number
  Events_count: number
  Locations_count: number
  Applicants_count: [Applicantscount]
}

const Dashboard = () => {
  const translate = useTranslate()
  const dataProvider = useDataProvider()
  const [data, setData] = useState<gqlresponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    dataProvider
      .getData('DashboardData')
      .then((data: Data) => {
        if (data.data) {
          setData(data.data)
          setError(false)
          setLoading(false)
          return
        }
        setError(true)
        setLoading(false)
        return
      })
      .catch((_error: any) => {
        setError(true)
        setLoading(false)
        return
      })
  }, [dataProvider, refresh])

  if (loading) return <Loading />

  if (error) return <MyError onClick={() => setRefresh(!refresh)} />

  if (!data) return <MyError onClick={() => setRefresh(!refresh)} />

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Title title={translate('Dashboard')} />
      <Typography variant="h4" gutterBottom></Typography>
      <Typography variant="h4" gutterBottom>
        {translate('Dashboarddata')}
      </Typography>
      <Grid container spacing={0.5}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TotalUsers value={data.Users_count} title="Users" icon={UserIcon} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TotalUsers value={data.Companies_count} title="Companies" icon={BusinessIcon} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TotalUsers value={data.Events_count} title="Events" icon={Festival} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TotalUsers value={data.Locations_count} title="Location" icon={LocationOn} />
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom></Typography>
      <Divider />
      <Typography variant="h4" gutterBottom></Typography>
      <Typography variant="h4" gutterBottom>
        {translate('applicants')}
      </Typography>
      <Grid container spacing={0.5}>
        {data.Applicants_count.map((val, i) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={6} key={i}>
              <TotalUsers value={val._count.status} title={val.status} icon={Article} />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Dashboard

// PENDING // will be showen in dashboard+

// APPROVED // will be showen in dashboard+
// DECLINED // user cant apply

// CANCELED // user can cancele (if status still "PENDING") and apply again
// COMPLETED // will be showen in dashboard+

// WAITLIST // user can cancele (if status still "WAITLIST") and apply again
// INTERVIEW // if status pending or waitlist // will be showen in dashboard+

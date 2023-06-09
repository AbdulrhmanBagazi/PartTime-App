import Button from '@mui/material/Button'
import ErrorIcon from '@mui/icons-material/Report'
import History from '@mui/icons-material/History'
import { Title } from 'react-admin'
import Container from '@mui/material/Container'

const MyError = (props: { onClick: () => void }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        justifyContent: 'center',
        alignContent: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        marginTop: -10,
        padding: 5,
        textAlign: 'center',
      }}>
      <Title title="Error" />
      <h1>
        <ErrorIcon /> Something Went Wrong{' '}
      </h1>
      <div>A client error occurred and your request couldn't be completed.</div>

      <Container sx={{ marginTop: 5 }}>
        <Button variant="contained" startIcon={<History />} onClick={props.onClick}>
          Back
        </Button>
      </Container>
    </Container>
  )
}

export default MyError

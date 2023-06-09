import { FC, createElement } from 'react'
import { Card, Box, Typography, Divider } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  icon: FC<any>
  title?: string
  subtitle?: string | number
  children?: ReactNode
}

const CardWithIcon = (props: Props) => {
  const { icon, title, subtitle, children } = props

  return (
    <Card>
      <Box
        sx={{
          overflow: 'inherit',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box width="3em" className="icon">
          {createElement(icon, { fontSize: 'large' })}
        </Box>
        <Box textAlign="left">
          <Typography color="textSecondary">{title}</Typography>
          <Typography variant="h5" component="h1">
            {subtitle || ''}
          </Typography>
        </Box>
      </Box>
      {children && <Divider />}
      {children}
    </Card>
  )
}

export default CardWithIcon

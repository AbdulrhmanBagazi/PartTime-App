import { useTranslate } from 'react-admin'
import CardWithIcon from './CardWithIcon'

interface Props {
  value: number
  title: string
  icon: React.FC<any>
}

const TotalUsers = (props: Props) => {
  const { value, title, icon } = props
  const translate = useTranslate()
  return <CardWithIcon icon={icon} title={translate(`${title}`)} subtitle={value.toString()} />
}

export default TotalUsers

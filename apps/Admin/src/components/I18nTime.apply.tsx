import React from 'react'
import moment from 'moment'

const I18nTime: React.FC<{
  time: string
  Language: string
}> = ({ time, Language }) => {
  const Time = moment(time).format('h:mm a')

  if (Language === 'en') {
    return <>{Time}</>
  }

  return <>{Time.includes('pm') ? Time.replace('pm', 'مساءً') : Time.replace('am', 'صباحا')}</>
}

export default I18nTime

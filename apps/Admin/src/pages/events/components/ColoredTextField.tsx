import { useRecordContext, BooleanFieldProps, TextField } from 'react-admin'

const ColoredTextField = (props: BooleanFieldProps) => {
  const record = useRecordContext(props)

  if (!record || !props.source) return null

  return record[props.source] === 'SOON' ? (
    <TextField
      {...props}
      sx={{ color: 'black', backgroundColor: 'yellow', padding: 0.5, borderRadius: 5, fontSize: 12 }}
    />
  ) : record[props.source] === 'ACTIVE' ? (
    <TextField
      {...props}
      sx={{ color: 'black', backgroundColor: '#89CFF0', padding: 0.5, borderRadius: 5, fontSize: 12 }}
    />
  ) : (
    <TextField
      {...props}
      sx={{ color: 'white', backgroundColor: 'green', padding: 0.5, borderRadius: 5, fontSize: 12 }}
    />
  )
}

export default ColoredTextField

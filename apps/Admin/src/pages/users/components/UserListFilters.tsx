import { TextInput, NullableBooleanInput } from 'react-admin'

const UserListFilters = [
  <TextInput label="filters.users_filters.email" source="email" />,
  <NullableBooleanInput source="verfied" nullLabel="filters.all" />,
  <NullableBooleanInput source="suspended" nullLabel="filters.all" />,
]

export default UserListFilters

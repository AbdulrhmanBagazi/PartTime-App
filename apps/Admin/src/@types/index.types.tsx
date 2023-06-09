export type UserTypes = {
  id: string
  email: string
  verfied: boolean
}

interface user {
  user: UserTypes
}

export type QueryResponse = [
  error: { data: Array<any> | object | string; status: number } | null,
  data: user | any
]

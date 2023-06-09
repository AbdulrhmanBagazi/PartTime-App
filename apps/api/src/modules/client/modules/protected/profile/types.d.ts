export type eventFilterType = {
  published: boolean
  status: EventStatus
}

export type userProfileType = {
  id: string
  createdAt: DateTime
  updatedAt: DateTime
  userId: string
  name: string
  nationality: string
  nationalID: string
  age: string
  gender: string
  city: string
  phone: string
  whatsapp: string
  about: string
  education: string
  experiences: Json[]
  arabicVideo: string
  englishVideo: string
}

export type createUserProfile = {
  name: string
  nationality: string
  nationalID: string
  age: string
  gender: string
}

export type updateUserProfile = {
  phone: string
  whatsapp: string
  about: string
  city: string
  education: string
  experiences: Json[]
}

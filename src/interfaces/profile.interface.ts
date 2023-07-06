export interface IProfile {
  id?: number
  username?: string
  firstname?: string
  lastname?: string
  fullname?: string
  email?: string
  address?: string
  phone1?: string
  phone2?: string
  department?: string
  institution?: string
  idnumber?: string
  interests?: string
  firstaccess?: number
  lastaccess?: number
  auth?: string
  suspended?: number
  confirmed?: number
  lang?: string
  calendartype?: string
  theme?: string
  timezone?: string
  mailformat?: number
  description?: string
  descriptionformat?: number
  city?: string
  country?: string
  profileimageurlsmall?: string
  profileimageurl?: string
  customfields?: ICustomField[]
  preferences?: IPreference[]
}

interface ICustomField {
  type: string
  value: string
  name: string
  shortname: string
}

interface IPreference {
  name: string
  value: string
}

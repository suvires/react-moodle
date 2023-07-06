export interface ICourse {
  id: number
  fullname: string
  displayname: string
  shortname: string
  categoryid: number
  categoryname: string
  sortorder?: number
  summary: string
  summaryformat: number
  summaryfiles?: IFile[]
  overviewfiles: IFile[]
  showactivitydates: number
  showcompletionconditions: number
  contacts: IContact[]
  enrollmentmethods: string[]
  customfields?: ICustomField[]
  idnumber?: string
  format?: string
  showgrades?: number
  newsitems?: number
  startdate?: number
  enddate?: number
  maxbytes?: number
  showreports?: number
  visible?: number
  groupmode?: number
  groupmodeforce?: number
  defaultgroupingid?: number
  enablecompletion?: number
  completionnotify?: number
  lang?: string
  theme?: string
  marker?: number
  legacyfiles?: number
  calendartype?: string
  timecreated?: number
  timemodified?: number
  requested?: number
  cacherev?: number
  filters?: IFilter[]
  courseformatoptions?: ICourseFormatOption[]
}

interface IFile {
  filename?: string
  filepath?: string
  filesize?: number
  fileurl?: string
  timemodified?: number
  mimetype?: string
  isexternalfile?: number
  repositorytype?: string
}

interface IContact {
  id: number
  fullname: string
}

interface ICustomField {
  name: string
  shortname: string
  type: string
  valueraw: string
  value: string
}

interface IFilter {
  filter: string
  localstate: number
  inheritedstate: number
}

interface ICourseFormatOption {
  name: string
  value: string
}

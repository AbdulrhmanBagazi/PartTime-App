const users: { [k: string]: string } = {
  User_list: 'id email verfied suspended createdAt Type',
  User: 'id email verfied suspended createdAt Type Profile {id createdAt updatedAt userId firstName lastName nationality nationalID dateOfBirth gender whatsapp phone}',
  update_User: 'suspended',
}

const companies: { [k: string]: string } = {
  Companies_list: 'id email name contact logo_url suspended createdAt',
  Companies: 'id email name contact logo_url suspended createdAt',
  create_Companies: 'id email name contact',
  CompaniesEvents:
    'id published createdAt updatedAt companyId title content title_en content_en image_url location_url status',
  update_Companies: 'logo_url suspended contact email name',
}

const events: { [k: string]: string } = {
  Event_list:
    'id published createdAt updatedAt companyId locationId app_sectionId title content title_en content_en image_url location_url status Location {title title_en} App_section {title title_en} details details_en eventcalendar company {name}',
  Event:
    'id published createdAt updatedAt companyId locationId app_sectionId title content title_en content_en image_url location_url status Location {title title_en} App_section {title title_en} details details_en eventcalendar company {name}',
  update_Event:
    'published status title content title_en content_en image_url location_url locationId app_sectionId details details_en eventcalendar',
  eventjobEvents:
    'id createdAt updatedAt title title_en status rate rate_type eventId Event {id title title_en}',
  eventshiftEvents: 'id createdAt updatedAt start_time end_time status eventId Event {id title title_en}',
  eventdayEvents: 'id date status',
}

const location: { [k: string]: string } = {
  Location_list: 'id title title_en createdAt updatedAt',
  Location: 'id title title_en createdAt updatedAt',
  update_Location: 'title title_en',
  LocationEvents:
    'id createdAt updatedAt companyId title content title_en content_en image_url location_url status',
}

const app_section: { [k: string]: string } = {
  app_section_list: 'id title title_en createdAt updatedAt published',
  app_section: 'id title title_en createdAt updatedAt published',
  update_app_section: 'title title_en published',
  app_sectionEvents:
    'id createdAt updatedAt companyId title content title_en content_en image_url location_url status published',
}

const dashboard: { [k: string]: string } = {
  DashboardData:
    'Users_count Companies_count Events_count Locations_count Applicants_count {status _count {status}}',
}

const eventjob: { [k: string]: string } = {
  eventjob_list:
    'id createdAt updatedAt title title_en status rate rate_type companyId eventId Event {id title title_en} company {name}',
  eventjob:
    'id createdAt updatedAt title title_en status rate rate_type companyId eventId Event {id title title_en} company {name}',
  update_eventjob: 'title title_en status rate rate_type',
  create_eventjob: 'title title_en status rate rate_type companyId eventId',
}

const eventshift: { [k: string]: string } = {
  eventshift_list:
    'id createdAt updatedAt start_time end_time status companyId eventId Event {id title title_en} company {name}',
  eventshift:
    'id createdAt updatedAt start_time end_time status companyId eventId Event {id title title_en} company {name}',
  update_eventshift: 'start_time end_time status',
  create_eventshift: 'start_time end_time status companyId eventId',
}

const eventday: { [k: string]: string } = {
  create_eventshift: 'eventId date',
}

const applicants: { [k: string]: string } = {
  applicants_list:
    'id createdAt updatedAt eventId companyId userId shiftId jobId name nationality nationalID dateOfBirth gender status contact {phone whatsapp} event {id title title_en} job { id title title_en rate rate_type } shift { id start_time end_time } start_date',
  applicants:
    'id createdAt updatedAt eventId companyId userId shiftId jobId name nationality nationalID dateOfBirth gender status contact {phone whatsapp} event {id title title_en} job { id title title_en rate rate_type } shift { id start_time end_time } start_date',
}

const Fileds: { [k: string]: string } = {
  ...users,
  ...companies,
  ...events,
  ...location,
  ...dashboard,
  ...app_section,
  ...eventjob,
  ...eventshift,
  ...eventday,
  ...applicants,
}

export default Fileds

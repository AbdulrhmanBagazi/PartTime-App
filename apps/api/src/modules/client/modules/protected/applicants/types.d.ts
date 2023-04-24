export type applicantsFilterType = {
  status: EventStatus;
  eventId: string;
  shiftId: string;
  jobId: string;
  companyId: string;
};

export type Order = 'desc' | 'asc';

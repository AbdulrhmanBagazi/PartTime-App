import { Applicants_Status } from '@prisma/client';

type createApplicants = {
  eventId: string;
  companyId: string;
  shiftId: string;
  jobId: string;
  name: string;
  nationality: string;
  nationalID: string;
  dateOfBirth: string;
  gender: string;
};

type updateApplicants = {
  status: Applicants_Status;
};

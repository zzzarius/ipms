import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface IIncident {
  id?: number;
  name?: string;
  startDate?: string;
  user?: IUser | null;
  patient?: IPatient | null;
}

export const defaultValue: Readonly<IIncident> = {};

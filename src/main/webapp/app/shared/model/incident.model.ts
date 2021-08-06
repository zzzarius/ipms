import dayjs from 'dayjs';
import { IPatient } from 'app/shared/model/patient.model';

export interface IIncident {
  id?: number;
  name?: string;
  startDate?: string;
  patients?: IPatient[] | null;
}

export const defaultValue: Readonly<IIncident> = {};

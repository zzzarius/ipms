import { IIncident } from 'app/shared/model/incident.model';
import { Category } from 'app/shared/model/enumerations/category.model';

export interface IPatient {
  id?: number;
  firstName?: string;
  lastName?: string;
  triageCategory?: Category | null;
  incident?: IIncident | null;
}

export const defaultValue: Readonly<IPatient> = {};

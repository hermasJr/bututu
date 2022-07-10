import dayjs from 'dayjs';
import { ICollaborator } from 'app/shared/model/collaborator.model';

export interface ITimesheet {
  id?: number;
  creationDate?: string | null;
  collaborator?: ICollaborator | null;
}

export const defaultValue: Readonly<ITimesheet> = {};

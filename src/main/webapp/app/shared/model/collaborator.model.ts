import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { ITimesheet } from 'app/shared/model/timesheet.model';

export interface ICollaborator {
  id?: number;
  creationDate?: string | null;
  user?: IUser | null;
  timesheets?: ITimesheet[] | null;
}

export const defaultValue: Readonly<ICollaborator> = {};

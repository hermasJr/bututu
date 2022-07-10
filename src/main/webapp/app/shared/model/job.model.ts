import dayjs from 'dayjs';

export interface IJob {
  id?: number;
  name?: string | null;
  creationDate?: string | null;
  description?: string | null;
}

export const defaultValue: Readonly<IJob> = {};

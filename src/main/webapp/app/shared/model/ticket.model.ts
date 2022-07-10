import dayjs from 'dayjs';

export interface ITicket {
  id?: number;
  subject?: string | null;
  creationDate?: string | null;
}

export const defaultValue: Readonly<ITicket> = {};

export interface IClient {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  salary?: number | null;
  commissionPct?: number | null;
}

export const defaultValue: Readonly<IClient> = {};

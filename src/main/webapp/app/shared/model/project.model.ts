import dayjs from 'dayjs';
import { ICollaborator } from 'app/shared/model/collaborator.model';
import { IClient } from 'app/shared/model/client.model';

export interface IProject {
  id?: number;
  name?: string | null;
  creationDate?: string | null;
  projectOwner?: ICollaborator | null;
  projectFinder?: ICollaborator | null;
  client?: IClient | null;
}

export const defaultValue: Readonly<IProject> = {};

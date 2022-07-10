import dayjs from 'dayjs';
import { IProposalItem } from 'app/shared/model/proposal-item.model';

export interface IProposal {
  id?: number;
  name?: string | null;
  creationDate?: string | null;
  codProposal?: string | null;
  proposalItems?: IProposalItem[] | null;
}

export const defaultValue: Readonly<IProposal> = {};

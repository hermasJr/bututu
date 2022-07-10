import { IProposal } from 'app/shared/model/proposal.model';

export interface IProposalItem {
  id?: number;
  description?: string | null;
  proposal?: IProposal | null;
}

export const defaultValue: Readonly<IProposalItem> = {};

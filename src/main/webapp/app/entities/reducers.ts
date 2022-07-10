import collaborator from 'app/entities/collaborator/collaborator.reducer';
import client from 'app/entities/client/client.reducer';
import project from 'app/entities/project/project.reducer';
import proposal from 'app/entities/proposal/proposal.reducer';
import proposalItem from 'app/entities/proposal-item/proposal-item.reducer';
import ticket from 'app/entities/ticket/ticket.reducer';
import job from 'app/entities/job/job.reducer';
import timesheet from 'app/entities/timesheet/timesheet.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  collaborator,
  client,
  project,
  proposal,
  proposalItem,
  ticket,
  job,
  timesheet,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;

import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Collaborator from './collaborator';
import Client from './client';
import Project from './project';
import Proposal from './proposal';
import ProposalItem from './proposal-item';
import Ticket from './ticket';
import Job from './job';
import Timesheet from './timesheet';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}collaborator`} component={Collaborator} />
        <ErrorBoundaryRoute path={`${match.url}client`} component={Client} />
        <ErrorBoundaryRoute path={`${match.url}project`} component={Project} />
        <ErrorBoundaryRoute path={`${match.url}proposal`} component={Proposal} />
        <ErrorBoundaryRoute path={`${match.url}proposal-item`} component={ProposalItem} />
        <ErrorBoundaryRoute path={`${match.url}ticket`} component={Ticket} />
        <ErrorBoundaryRoute path={`${match.url}job`} component={Job} />
        <ErrorBoundaryRoute path={`${match.url}timesheet`} component={Timesheet} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};

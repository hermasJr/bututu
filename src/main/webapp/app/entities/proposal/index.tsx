import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Proposal from './proposal';
import ProposalDetail from './proposal-detail';
import ProposalUpdate from './proposal-update';
import ProposalDeleteDialog from './proposal-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProposalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProposalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProposalDetail} />
      <ErrorBoundaryRoute path={match.url} component={Proposal} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProposalDeleteDialog} />
  </>
);

export default Routes;

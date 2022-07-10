import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProposalItem from './proposal-item';
import ProposalItemDetail from './proposal-item-detail';
import ProposalItemUpdate from './proposal-item-update';
import ProposalItemDeleteDialog from './proposal-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProposalItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProposalItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProposalItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProposalItem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProposalItemDeleteDialog} />
  </>
);

export default Routes;

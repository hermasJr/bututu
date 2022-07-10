import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Collaborator from './collaborator';
import CollaboratorDetail from './collaborator-detail';
import CollaboratorUpdate from './collaborator-update';
import CollaboratorDeleteDialog from './collaborator-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CollaboratorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CollaboratorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CollaboratorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Collaborator} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CollaboratorDeleteDialog} />
  </>
);

export default Routes;

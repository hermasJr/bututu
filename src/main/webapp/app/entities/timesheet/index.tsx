import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Timesheet from './timesheet';
import TimesheetDetail from './timesheet-detail';
import TimesheetUpdate from './timesheet-update';
import TimesheetDeleteDialog from './timesheet-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TimesheetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TimesheetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TimesheetDetail} />
      <ErrorBoundaryRoute path={match.url} component={Timesheet} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TimesheetDeleteDialog} />
  </>
);

export default Routes;

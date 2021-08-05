import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Incident from './incident';
import IncidentDetail from './incident-detail';
import IncidentUpdate from './incident-update';
import IncidentDeleteDialog from './incident-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={IncidentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={IncidentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={IncidentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Incident} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={IncidentDeleteDialog} />
  </>
);

export default Routes;

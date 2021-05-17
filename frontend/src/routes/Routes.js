import React from 'react';
import { Switch } from 'react-router-dom';

import RouteWithLayout from 'routes/RouteWithLayout';
import ThemeLayout from 'layouts/ThemeLayout';

import {
  Home as HomeView,
  NotFound as NotFoundView
} from '../views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={HomeView}
        exact
        layout={ThemeLayout}
        path="/"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={ThemeLayout}
      />
    </Switch>
  );
};

export default Routes;

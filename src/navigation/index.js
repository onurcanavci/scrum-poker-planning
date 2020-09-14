import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import CreatePlanning from "../Pages/CreatePlanning";
import ViewPlanningDev from "../Pages/ViewPlanningDev";
import ViewPlanningSM from "../Pages/ViewPlanningSM";

const NotFound = () => <p>404:( Page not Found</p>;

function Navigation() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/poker-planning-add-story-list" />}
          />
          <Route
            exact
            path="/poker-planning-add-story-list"
            component={CreatePlanning}
          />
          <Route
            exact
            path="/poker-planning-view-as-scrum-master"
            component={ViewPlanningSM}
          />
          <Route
            exact
            path="/poker-planning-view-as-developer"
            component={ViewPlanningDev}
          />
          {/* And other pages go on */}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Navigation;

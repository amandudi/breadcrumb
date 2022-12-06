import React from "react";
import { Route, Switch } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { Content } from "./comp/Content";

export default function App() {
    return (
    <>
      <Breadcrumbs/>
      <Switch>
        <Route exact from="/*" render={props => <Content {...props} />} />
      </Switch>
    </>
  );
}

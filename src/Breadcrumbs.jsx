import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs, Button, Typography
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Breadcrumbs = props => {
  const {
    history,
    location: { pathname }
  } = props;
  const pathnames = pathname == '/' ? ['home'] : pathname.split("/").filter(x => x);
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {pathnames.map((name, index) => {
        console.log('a')
        const link = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <Button className="MuiButton-textSecondary" key={name} onClick={() => history.push(link)}>
            {name}
          </Button>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);

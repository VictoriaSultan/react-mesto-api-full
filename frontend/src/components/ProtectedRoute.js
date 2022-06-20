import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  return (
    <Route
      {...restOfProps}
      render={() =>
        restOfProps.isLoggedIn ? <Component {...restOfProps} /> : <Redirect to="/sign-in" />
      }
    />
  );
};

export default ProtectedRoute;

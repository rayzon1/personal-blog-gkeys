import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

// HOC will wrap private route in context to compare auth user.
// If auth, will render private route, otherwise redirect to sign-in.
export default ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={() =>
        Cookies.getJSON("authenticatedUser") ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin"
            }}
            push
          />
        )
      }
    />
  );
};

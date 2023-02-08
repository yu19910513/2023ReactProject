import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../auth/isLoggedIn';

const LoggedInRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default LoggedInRoute;

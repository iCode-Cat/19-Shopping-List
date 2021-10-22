import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    isAuthenticated !== null && (
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated) {
            return <Component />;
          } else {
            return (
              <Redirect
                to={{ pathname: '/login', state: { from: props.location } }}
              />
            );
          }
        }}
      ></Route>
    )
  );
};

export default ProtectedRoute;

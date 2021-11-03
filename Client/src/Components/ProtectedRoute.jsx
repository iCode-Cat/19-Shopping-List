import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ State, component: Component, ...rest }) => {
  const isAuthenticated = State.user.isAuthenticated;
  return (
    isAuthenticated !== null && (
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated) {
            return <Component State={State} />;
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

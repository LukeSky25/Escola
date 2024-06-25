import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggedIn = true;

  if (isClosed && !isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { prevpath: rest.location.pathname },
        }}
      />
    );
  }

  return <Route {...rest} component={Component} />;
}

MyRoute.protoTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};

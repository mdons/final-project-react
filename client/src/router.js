import React, { Fragment } from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
import cookie from "cookie";
import Home from "./components/Home";
import Dashboard from "./containers/Dashboard";
import NotFound from "./components/NotFound";
import styled from "styled-components";
import { ReactComponent as Logo } from "./Logo.svg";

const StyledHeader = styled.div`
  // display: flex;
  // justify-content: center;
  // height: 7vh;
`;

const checkAuth = () => {
  const cookies = cookie.parse(document.cookie);
  return cookies.id_token ? true : false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const Router = () => (
  <Fragment>
    <StyledHeader>
      <Logo />
    </StyledHeader>
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;

import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import Router from "./router";
import { connect } from "react-redux";
import { setUser } from "./redux/actions";

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient( #6d5ae7, #1c2047);
    height: 100vh;
  }
`;

class App extends Component {
  componentDidMount() {
    const cookies = cookie.parse(document.cookie);
    if (cookies.id_token) {
      const payload = jwt.verify(cookies.id_token, "secret");
      this.props.setUser(payload._doc);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <GlobalStyle />
        <Router />
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);

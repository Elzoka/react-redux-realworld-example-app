import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import Article from "./Article";
import Editor from "./Editor";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Settings from "./Settings";
import Profile from "./Profile";
import ProfileFavorites from "./Profile/ProfileFavorites";

import { APP_LOAD, REDIRECT } from "../constants/actionTypes";
import agent from "../agent";

const App = (props) => {
  const {
    redirectTo,
    history,
    onRedirect,
    appLoaded,
    appName,
    currentUser,
  } = props;

  useEffect(() => {
    if (redirectTo) {
      history.push(props.redirectTo);
      onRedirect();
    }
  }, [redirectTo]);

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    props.onLoad(token ? agent.Auth.current() : null, token);
  }, []);

  if (appLoaded) {
    return (
      <div>
        <Header appName={appName} currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/editor" component={Editor} />
          <Route path="/article/:id" component={Article} />
          <Route path="/settings" component={Settings} />
          <Route path="/@:username/favorites" component={ProfileFavorites} />
          <Route path="/@:username" component={Profile} />
        </Switch>
      </div>
    );
  }
  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route, Switch } from "react-router-dom";

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
import { store } from "../store";
import agent from "../agent";

const App = (props) => {
  const { redirectTo } = props;
  useEffect(() => {
    if (redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(props.redirectTo));
      props.onRedirect();
    }
  });

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    props.onLoad(token ? agent.Auth.current() : null, token);
  }, []);

  if (props.appLoaded) {
    return (
      <div>
        <Header appName={props.appName} currentUser={props.currentUser} />
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
      <Header appName={props.appName} currentUser={props.currentUser} />
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

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);

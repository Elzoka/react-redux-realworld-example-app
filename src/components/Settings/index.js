import React from "react";
import { connect } from "react-redux";

import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT,
} from "../../constants/actionTypes";
import agent from "../../agent";
import ListErrors from "../ListErrors";
import { SettingsForm } from "./SettingsForm";

const Settings = (props) => {
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={props.errors}></ListErrors>

            <SettingsForm
              currentUser={props.currentUser}
              onSubmitForm={props.onSubmitForm}
            />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={props.onClickLogout}
            >
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (user) =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

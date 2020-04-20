import { mapStateToProps } from "./Profile";
import React, { useEffect } from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import ProfileHOC from "./ProfileHOC";
import Tab from "./Tabs";

const ProfileFavorites = (props) => {
  useEffect(() => {
    props.onLoad(
      (page) => agent.Articles.favoritedBy(props.match.params.username, page),
      Promise.all([
        agent.Profile.get(props.match.params.username),
        agent.Articles.favoritedBy(props.match.params.username),
      ])
    );

    return () => {
      props.onUnload();
    };
  }, []);

  return (
    <ProfileHOC {...props}>
      <Tab username={props.profile.username} activeTab="favorite_articles" />
    </ProfileHOC>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);

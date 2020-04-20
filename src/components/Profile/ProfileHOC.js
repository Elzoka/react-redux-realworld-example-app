import React from "react";
import EditProfileSettings from "./EditProfileSettings";
import FollowUserButton from "./FollowUserButton";
import ArticleList from "../ArticleList";

const ProfileHOC = (props) => {
  const profile = props.profile;
  if (!profile) {
    return null;
  }

  const isUser =
    props.currentUser && props.profile.username === props.currentUser.username;

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile.image}
                className="user-img"
                alt={profile.username}
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <EditProfileSettings isUser={isUser} />
              <FollowUserButton
                isUser={isUser}
                user={profile}
                follow={props.onFollow}
                unfollow={props.onUnfollow}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">{props.children}</div>

            <ArticleList
              pager={props.pager}
              articles={props.articles}
              articlesCount={props.articlesCount}
              state={props.currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHOC;

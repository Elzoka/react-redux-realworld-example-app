import React, { useState } from "react";
import { connect } from "react-redux";

import agent from "../../agent";
import { ADD_COMMENT } from "../../constants/actionTypes";

const CommentInput = (props) => {
  const [body, setBody] = useState("");

  const setBodyInput = (ev) => {
    setBody(ev.target.value);
  };

  const createComment = (ev) => {
    ev.preventDefault();
    const payload = agent.Comments.create(props.slug, { body });
    setBody("");
    props.onSubmit(payload);
  };

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={setBodyInput}
          rows="3"
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={props.currentUser.image}
          className="comment-author-img"
          alt={props.currentUser.username}
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
});

export default connect(() => ({}), mapDispatchToProps)(CommentInput);

import React from "react";

export const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="/" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

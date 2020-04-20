import React from "react";
import agent from "../../agent";

export const FeedTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick("feed", agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <a
          href="/"
          className={props.tab === "feed" ? "nav-link active" : "nav-link"}
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

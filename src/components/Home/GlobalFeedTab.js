import React from "react";

import agent from "../../agent";

export const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick("all", agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href="/"
        className={props.tab === "all" ? "nav-link active" : "nav-link"}
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  );
};

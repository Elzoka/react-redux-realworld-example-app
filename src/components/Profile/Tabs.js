import React from "react";
import { Link } from "react-router-dom";

const Tab = ({ username, activeTab }) => {
  const isActiveTab = (tabName) => {
    return activeTab === tabName ? "active" : "";
  };

  return (
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <Link
          className={`nav-link ${isActiveTab("articles")}`}
          to={`/@${username}`}
        >
          My Articles
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className={`nav-link ${isActiveTab("favorite_articles")}`}
          to={`/@${username}/favorites`}
        >
          Favorited Articles
        </Link>
      </li>
    </ul>
  );
};

export default Tab;

import ArticleList from "../ArticleList";
import React from "react";
import { connect } from "react-redux";

import { CHANGE_TAB } from "../../constants/actionTypes";
import { GlobalFeedTab } from "./GlobalFeedTab";
import { TagFilterTab } from "./TagFilterTab";
import { FeedTab } from "./FeedTab";

const MainView = (props) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <FeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />
        </ul>
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({ type: CHANGE_TAB, tab, pager, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

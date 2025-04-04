import React from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";

// import './style.css'

const NewsList = ({ articles, hasMore, loading, loadMore }) => (
  <div>
    <div className="news-container">
      {articles.map((news, index) => <NewsItem key={index} news={news} />)}
    </div>

    {hasMore && !loading && <button className="load-more" onClick={loadMore}>Load More</button>}
    {loading && <Loader />}
  </div>
);

export default NewsList;

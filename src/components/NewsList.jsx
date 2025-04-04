import React from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";

// import './style.css'

// const NewsList = ({ articles, hasMore, loading, loadMore }) => (
//   <div>
//     <div className="news-container">
//       {articles.map((news, index) => <NewsItem key={index} news={news} />)}
//     </div>

//     {hasMore && !loading && <button className="load-more" onClick={loadMore}>Load More</button>}
//     {loading && <Loader />}
//   </div>
// );

const NewsList = ({ articles, hasMore, loading, loadMore }) => (
  <div>
    <div className="news-container">
      {articles.length === 0 && !loading ? (
        <div className="no-articles-message">
          <h3>No articles available</h3>
          <p>
            It looks like there’s nothing to display at the moment. This might be due to:
          </p>
          <ul>
            <li>No recent news updates</li>
            <li>Filters excluding all content</li>
          </ul>
          <p>
            Try refreshing the page or checking back later.
          </p>
        </div>
      ) : (
        articles.map((news, index) => <NewsItem key={index} news={news} />)
      )}
    </div>

    {hasMore && !loading && <button className="load-more" onClick={loadMore}>Load More</button>}
    {loading && <Loader />}
  </div>
);


export default NewsList;

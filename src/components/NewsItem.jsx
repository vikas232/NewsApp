import React from "react";

const NewsItem = ({ news }) => (
  <div className="news-card">
    <img src={news.urlToImage || "https://via.placeholder.com/300"} alt="News Thumbnail" />
    <div className="news-content">
      <div className="news-title">{news.title}</div>
      <div className="news-meta">By {news.author || "Unknown"} | {new Date(news.publishedAt).toLocaleDateString()}</div>
      <div className="news-description">{news.description}</div>
      <button className="read-more" onClick={() => window.open(news.url, "_blank")}>Read More</button>
    </div>
  </div>
);

export default NewsItem;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, fetchSearchNews, resetNews } from "../redux/newsSlice";
import Navbar from "../components/Navbar";
import NewsList from "../components/NewsList";
import "../styles/global.css";
const NewsSearch = () => {
  const dispatch = useDispatch();
  const { articles, hasMore, loading, page, keyword, country, category, sortBy, newsType } = useSelector((state) => state.news);

  const handleSearch = () => {
    dispatch(resetNews());
    if (newsType === "headlines") dispatch(fetchNews({ keyword, country, category, page: 1 }));
    else dispatch(fetchSearchNews({ keyword, page: 1, sortBy }));
  };
  
  const loadMore = () => {
    if (newsType === "headlines") {
      dispatch(fetchNews({ keyword, country, category, page }));
    } else {
      dispatch(fetchSearchNews({ keyword, page, sortBy }));
    }
  };

  useEffect(() => {
    handleSearch();
  }, [newsType]);

  return <div>
    <Navbar handleSearch={handleSearch} />
    <NewsList {...{ articles, hasMore, loading , loadMore}} />
    </div>;
};

export default NewsSearch;

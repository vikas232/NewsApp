import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../redux/newsSlice";
import { CATEGORIES, COUNTRIES, SORT_OPTIONS, NEWS_TYPE_OPTIONS } from "../constants";
// import './style.css'

const Navbar = ({ handleSearch }) => {
  const dispatch = useDispatch();
  const { keyword, country, category, sortBy, newsType } = useSelector((state) => state.news);

  return (
    <nav className="navbar">
      <h2>News App</h2>
      <div>
        <input
          type="text"
          placeholder="Search news..."
          value={keyword}
          onChange={(e) => dispatch(setFilters({ keyword: e.target.value }))}
        />

        <select value={newsType} onChange={(e) => dispatch(setFilters({ newsType: e.target.value }))}>
          {NEWS_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        {newsType === "headlines" && (
          <>
            <select value={country} onChange={(e) => dispatch(setFilters({ country: e.target.value }))}>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>

            <select value={category} onChange={(e) => dispatch(setFilters({ category: e.target.value }))}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </>
        )}

        {newsType === "everything" && (
          <select value={sortBy} onChange={(e) => dispatch(setFilters({ sortBy: e.target.value }))}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}

        <button id="searchbtn" data-testid="search-button" className="search-btn" onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;

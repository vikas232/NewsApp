import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const API_KEY = "046d2e14e65b4d88acbaaa64c353139b"
// const API_KEY = 'c7c0bd7c5da741bea9e6787987dcf172';
const BASE_URL = 'https://newsapi.org/v2/';

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ keyword, country, category, page }) => {
    const response = await axios.get(`${BASE_URL}top-headlines`, {
      params: { q: keyword, country, category, page, pageSize: 30, apiKey: API_KEY },
    });
    return { articles: response.data.articles, page };
  }
);

export const fetchSearchNews = createAsyncThunk(
  "news/fetchSearchNews",
  async ({ keyword, page, sortBy }) => {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: { q: keyword, page, pageSize: 30, sortBy, apiKey: API_KEY },
    });
    return { articles: response.data.articles, page };
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    keyword: "",
    country: "us",
    category: "general",
    sortBy: "publishedAt",
    newsType: "headlines",
    articles: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {
    resetNews: (state) => { state.articles = []; state.page = 1; state.hasMore = true; },
    setFilters: (state, action) => { Object.assign(state, action.payload); },
  },
  extraReducers: (builder) => {
    builder
      // Fetch News (Headlines)
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.articles = action.payload.articles;
        } else {
          state.articles = [...state.articles, ...action.payload.articles];
        }
        state.page = action.payload.page + 1;
        state.hasMore = action.payload.articles.length > 0;
        state.headlinesLoaded = true;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Search News (Everything)
      .addCase(fetchSearchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchNews.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.articles = action.payload.articles;
        } else {
          state.articles = [...state.articles, ...action.payload.articles];
        }
        state.page = action.payload.page + 1;
        state.hasMore = action.payload.articles.length > 0;
        state.headlinesLoaded = true;
      })
      .addCase(fetchSearchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetNews, setFilters } = newsSlice.actions;
export default newsSlice.reducer;


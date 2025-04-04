import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../../redux/newsSlice";
import Navbar from "../../components/Navbar";

const store = configureStore({ reducer: { news: newsReducer } });

describe("Navbar Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );
  });

  it("renders the navbar", () => {
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });


  it("renders the search input field", () => {
    const searchInput = screen.getByPlaceholderText("Search news...");
    expect(searchInput).toBeInTheDocument();
  });

  it("allows typing in the search input field", () => {
    const searchInput = screen.getByPlaceholderText("Search news...");
    fireEvent.change(searchInput, { target: { value: "Latest News" } });

    expect(searchInput.value).toBe("Latest News");
  });

  it("renders the search button", () => {
    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });



});



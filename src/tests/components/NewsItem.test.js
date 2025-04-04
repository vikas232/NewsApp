import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsItem from "../../components/NewsItem";



const mockNews = {
  title: "Test News Title",
  author: "John Doe",
  publishedAt: "2024-04-04T12:00:00Z",
  description: "This is a test description for the news item.",
  urlToImage: "https://via.placeholder.com/300",
  url: "https://example.com"
};

describe("NewsItem Component", () => {
  test("renders news item with correct content", () => {
    render(<NewsItem news={mockNews} />);

    expect(screen.getByText("Test News Title")).toBeInTheDocument();
    expect(screen.getByText("By John Doe | 4/4/2024")).toBeInTheDocument();
    expect(screen.getByText("This is a test description for the news item.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /read more/i })).toBeInTheDocument();
  });

  test("renders fallback values when data is missing", () => {
    const incompleteNews = {
      title: "Fallback News",
      publishedAt: "2024-04-04T12:00:00Z",
      url: "https://example.com"
    };

    render(<NewsItem news={incompleteNews} />);

    expect(screen.getByText("Fallback News")).toBeInTheDocument();
    expect(screen.getByText("By Unknown | 4/4/2024")).toBeInTheDocument();
    expect(screen.getByAltText("News Thumbnail")).toHaveAttribute("src", "https://via.placeholder.com/300");
  });

  test("opens news link in a new tab when 'Read More' is clicked", () => {
    window.open = jest.fn(); // Mock window.open

    render(<NewsItem news={mockNews} />);

    fireEvent.click(screen.getByRole("button", { name: /read more/i }));

    expect(window.open).toHaveBeenCalledWith("https://example.com", "_blank");
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsItem from "../../components/NewsItem";

const mockNews = {
  title: "Breaking News!",
  author: "John Doe",
  publishedAt: "2024-04-03T12:00:00Z",
  description: "This is a test news description.",
  urlToImage: "https://example.com/news.jpg",
  url: "https://example.com/full-article",
};

describe("NewsItem Component", () => {
  it("renders the news card with correct content", () => {
    render(<NewsItem news={mockNews} />);

    expect(screen.getByText("Breaking News!")).toBeInTheDocument();
    expect(screen.getByText("By John Doe | 4/3/2024")).toBeInTheDocument();
    expect(screen.getByText("This is a test news description.")).toBeInTheDocument();
  });

  it("displays a placeholder image when urlToImage is missing", () => {
    const { getByAltText } = render(<NewsItem news={{ ...mockNews, urlToImage: null }} />);
    
    const image = getByAltText("News Thumbnail");
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/300");
  });

  it("opens the news URL in a new tab when 'Read More' is clicked", () => {
    window.open = jest.fn(); // Mock window.open

    render(<NewsItem news={mockNews} />);
    const readMoreButton = screen.getByText("Read More");

    fireEvent.click(readMoreButton);
    expect(window.open).toHaveBeenCalledWith("https://example.com/full-article", "_blank");
  });
});

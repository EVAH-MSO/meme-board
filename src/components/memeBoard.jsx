import React, { useState, useEffect } from "react";
// ❌ REMOVED Lottie imports
import MemeCard from "./memeCard";
import memes from "../data/memes";
import "./memeBoard.css";

// 💡 NEW: Import your loading image file
import LoadingImage from "../assets/hehe.png";

const MIN_LOADING_TIME = 2000; // Display loader for at least 2 seconds

export default function MemeBoard() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // --- Simulate Loading ---
  useEffect(() => {
    const startTime = Date.now();

    // Simulate initial data fetching/app boot time
    const timer = setTimeout(() => {
      const timeElapsed = Date.now() - startTime;
      const remainingTime = MIN_LOADING_TIME - timeElapsed;

      // Enforce the minimum loading time
      setTimeout(
        () => setIsLoading(false),
        remainingTime > 0 ? remainingTime : 0
      );
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // --- Filtering Logic ---
  const categories = ["All", ...new Set(memes.map((m) => m.category))];

  const filteredMemes = memes.filter((meme) => {
    const categoryMatch = filter === "All" || meme.category === filter;
    const searchMatch =
      meme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meme.category.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // --- 💡 RENDER REVISED Loading Screen ---
  if (isLoading) {
    return (
      <div className="loading-screen">
        <img
          src={LoadingImage}
          alt="Loading Laughter"
          className="loading-image"
          style={{ width: 200, height: 200 }}
        />
        <h2>Weka Simu Chini... Loading the Laughter!</h2>
      </div>
    );
  }

  // --- Render Main Board ---
  return (
    <div className="board">
      <header className="board-header">
        <h1>😂 Kenyan Meme Board</h1>
        <input
          type="text"
          placeholder="Search memes by title or category..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setFilter("All");
          }}
        />
      </header>

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setSearchQuery("");
            }}
            className={filter === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="meme-grid">
        {filteredMemes.map((meme) => (
          <MemeCard meme={meme} key={meme.id} />
        ))}
        {filteredMemes.length === 0 && (
          <p className="no-results">
            No memes found matching your criteria. Try a different filter or
            search term!
          </p>
        )}
      </div>
    </div>
  );
}

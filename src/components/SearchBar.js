// src/components/SearchBar.js
import React, { useState, useEffect, useRef } from "react";

function SearchBar({ onSearchActive }) {
  // Accept the prop
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  // Mock suggestion data for demonstration
  const mockSuggestions = [
    "JavaScript tutorials",
    "React basics",
    "Frontend development",
    "How to use Git",
    "Web development tips",
    "CSS styling guides",
    "APIs in JavaScript",
    "React hooks",
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (searchTerm) => {
    const term = searchTerm || query;
    if (term.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        window.open(`https://www.google.com/search?q=${term}`, "_blank");
        setQuery(""); // Clear the search field
        setIsTyping(false); // Hide suggestions when clearing
        setSuggestions([]); // Clear suggestions
        onSearchActive(false); // Set search as inactive
      }, 400);
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) return;
  
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`);
      const data = await response.json();
  
      setSuggestions(data[1] || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  
  
  

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  
    // Notify the parent component about the search activity
    onSearchActive(inputValue.trim() !== "");
  
    if (inputValue.trim()) {
      setIsTyping(true);
      fetchSuggestions(inputValue); // Fetch real-time suggestions
    } else {
      setIsTyping(false);
      setSuggestions([]);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <section className="search-bar">
      <div className={`input-group ${isTyping ? "active" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Start typing to search..."
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={isTyping ? "visible" : "hidden"}
        />
        {isTyping && (
          <button onClick={() => handleSearch()} className="search-btn">
            <i className="bx bx-search-alt"></i>
          </button>
        )}
        {isSearching && <div className="splash-animation"></div>}
      </div>

      {/* Suggestion Dropdown */}
      {isTyping && suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SearchBar;

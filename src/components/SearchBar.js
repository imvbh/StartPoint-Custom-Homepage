// src/components/SearchBar.js
import React, { useState, useEffect, useRef } from "react";

function SearchBar({ onSearchActive }) {
  // Accept the prop
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

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
      // Fetch suggestions from DuckDuckGo API
      const response = await fetch(`https://api.duckduckgo.com/?q=${query}&format=json&no_redirect=1&no_html=1&skip_disambig=1`);
  
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Try parsing the response as JSON
      const data = await response.json();
  
      // Extract suggestions from the API response
      const suggestions = data.RelatedTopics
        .filter(topic => topic.Text && topic.ResultType === "search") // Filter only suggestions
        .map(topic => topic.Text) || [];
      
      // Set suggestions state
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      // Optionally, you can clear suggestions on error
      setSuggestions([]);
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

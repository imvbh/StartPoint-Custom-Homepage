// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import QuickLinks from "./components/QuickLinks";
import Weather from "./components/Weather";
import SearchBar from "./components/SearchBar";
import TodoList from "./components/TodoList";
import Countdown from "./components/Countdown";

function App() {
  const [name, setName] = useState(localStorage.getItem("username") || "User");
  const [isEditing, setIsEditing] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [searchActive, setSearchActive] = useState(false); // New state to track search activity

  // Update greeting based on the time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Save name to localStorage when changed
  useEffect(() => {
    localStorage.setItem("username", name);
  }, [name]);

  // Toggle editing mode and handle name changes
  const handleNameClick = () => setIsEditing(true);
  const handleNameChange = (e) => setName(e.target.value);
  const handleNameBlur = () => setIsEditing(false);

  // Callback function to set search active state
  const handleSearchActive = (active) => {
    setSearchActive(active);
  };

  return (
    <div className="app">
      <header className="greeting">
        <h1 id="greeting-text">
          <div className="time">{time}</div>
          {greeting},{" "}
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              autoFocus
              className="name-input"
            />
          ) : (
            <span onClick={handleNameClick} className="name-display">
              {name}
            </span>
          )}
          !
        </h1>
      </header>
      <main>
      <div className="main">StartPage</div>
        <SearchBar onSearchActive={handleSearchActive} />{" "}
        {/* Pass the callback */}
        {!searchActive && <QuickLinks />}{" "}
        {/* Conditionally render QuickLinks */}
      </main>
    </div>
  );
}

export default App;

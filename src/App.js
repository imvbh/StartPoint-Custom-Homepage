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
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    })
  );
  const [backgroundClass, setBackgroundClass] = useState("morning");

  const [searchActive, setSearchActive] = useState(false); // New state to track search activity

  useEffect(() => {
    const hours = new Date().getHours();

    if (hours >= 6 && hours < 12) {
      setBackgroundClass("morning");
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 16) {
      setBackgroundClass("afternoon");
      setGreeting("Good Afternoon");
    } else if (hours >= 16 && hours < 19) {
      setBackgroundClass("evening");
      setGreeting("Good Evening");
    } else {
      setBackgroundClass("night");
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("username", name);
  }, [name]);

  const handleNameClick = () => setIsEditing(true);
  const handleNameChange = (e) => setName(e.target.value);
  const handleNameBlur = () => setIsEditing(false);

  // Callback function to set search active state
  const handleSearchActive = (active) => {
    setSearchActive(active);
  };

  return (
    <div className={`app ${backgroundClass}`}>
      <header className="greeting">
        <h1 id="greeting-text">
          <div className="time">{time}</div>
          <div className="date">{date}</div>
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
        <div className="main">
          <div className="text1">Sttp://</div>
          <div className="text2">
            <p>
              <span className="bold">St</span>ar<span className="bold">tp</span>
              oint://
            </p>
          </div>
        </div>
        <SearchBar onSearchActive={handleSearchActive} />
        <QuickLinks />
      </main>
    </div>
  );
}

export default App;

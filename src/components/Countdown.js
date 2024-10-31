// src/components/Countdown.js
import React, { useState, useEffect } from 'react';

function Countdown() {
  const [targetDate, setTargetDate] = useState('');
  const [timeLeft, setTimeLeft] = useState('0d 0h 0m 0s');

  useEffect(() => {
    if (targetDate) {
      const interval = setInterval(() => {
        const now = new Date();
        const target = new Date(targetDate);
        const timeDiff = target - now;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [targetDate]);

  return (
    <section className="countdown">
      <h2>Countdown</h2>
      <div>{timeLeft}</div>
      <input
        type="date"
        onChange={(e) => setTargetDate(e.target.value)}
      />
    </section>
  );
}

export default Countdown;

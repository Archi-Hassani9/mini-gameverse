import React, { useState, useEffect } from "react";
import guessBanner from "../assets/images/number-guessing.png";

function GuessNumber({ scores, setScores }) {
  const [randomNumber, setRandomNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    generateNumber();
  }, []);

  const generateNumber = () => {
    const num = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(num);
    setAttempts(0);
    setMessage("");
    setGuess("");
  };

  const checkGuess = () => {
    if (guess === "") {
      setMessage("⚠ Please enter a number");
      return;
    }

    const userGuess = Number(guess);
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (userGuess === randomNumber) {
      setMessage("🎉 Correct Guess!");
      setScores((prev) => ({
        ...prev,
        guessBestAttempts:
          prev.guessBestAttempts === null
            ? nextAttempts
            : Math.min(prev.guessBestAttempts, nextAttempts),
      }));
    } else if (userGuess > randomNumber) {
      setMessage("📉 Too High!");
    } else {
      setMessage("📈 Too Low!");
    }
  };

  return (
    <div className="container">
      <img src={guessBanner} alt="Number Guessing" className="page-banner" />
      <h2>🎯 Number Guessing Game</h2>
      <p>Guess a number between 1 and 100</p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <br />

      <button onClick={checkGuess}>Check</button>
      <button onClick={generateNumber}>Reset</button>

      <div className="result-box">
        <h3>{message}</h3>
        <p>Attempts: {attempts}</p>
      </div>
    </div>
  );
}

export default GuessNumber;
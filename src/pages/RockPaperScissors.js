import React, { useState } from "react";
import rpsBanner from "../assets/images/rps-banner.png";
import rockImg from "../assets/images/rock.png";
import paperImg from "../assets/images/paper.png";
import scissorsImg from "../assets/images/scissors.png";

function RockPaperScissors({ scores, setScores }) {
  const choices = [
    { name: "Rock", image: rockImg },
    { name: "Paper", image: paperImg },
    { name: "Scissors", image: scissorsImg }
  ];

  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    const randomChoice =
      choices[Math.floor(Math.random() * choices.length)].name;

    setUserChoice(choice);
    setComputerChoice(randomChoice);

    if (choice === randomChoice) {
      setResult("It's a Draw!");
    } else if (
      (choice === "Rock" && randomChoice === "Scissors") ||
      (choice === "Paper" && randomChoice === "Rock") ||
      (choice === "Scissors" && randomChoice === "Paper")
    ) {
      setResult("🎉 You Win!");
      setScores((prev) => ({ ...prev, rpsScore: prev.rpsScore + 1 }));
    } else {
      setResult("😢 You Lose!");
      setScores((prev) => ({ ...prev, rpsScore: prev.rpsScore - 1 }));
    }
  };

  const resetGameScore = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setScores((prev) => ({ ...prev, rpsScore: 0 }));
  };

  return (
    <div className="container">
      <img src={rpsBanner} alt="Rock Paper Scissors" className="page-banner" />
      <h2>🪨 Rock Paper Scissors</h2>

      <div className="rps-choice-grid">
        {choices.map((choice, index) => (
          <div key={index} className="rps-choice-card">
            <img src={choice.image} alt={choice.name} />
            <h3>{choice.name}</h3>
            <button onClick={() => playGame(choice.name)}>Choose</button>
          </div>
        ))}
      </div>

      <div className="result-box">
        <h3>Your Choice: {userChoice}</h3>
        <h3>Computer Choice: {computerChoice}</h3>
        <h2>{result}</h2>
        <h3>Score: {scores.rpsScore}</h3>
      </div>

      <br />
      <button onClick={resetGameScore}>Reset Game Score</button>
    </div>
  );
}

export default RockPaperScissors;
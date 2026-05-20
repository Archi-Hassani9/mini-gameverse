import React from "react";

function Scoreboard({ scores, resetScores }) {
  return (
    <div className="container">
      <h2>📊 Scoreboard</h2>

      <div className="card">
        <h3>🎯 Number Guessing</h3>
        <h4>
          Best Attempts:{" "}
          {scores.guessBestAttempts === null ? "Not played yet" : scores.guessBestAttempts}
        </h4>
      </div>

      <div className="card">
        <h3>🪨 Rock Paper Scissors</h3>
        <h4>Score: {scores.rpsScore}</h4>
      </div>

      <div className="card">
        <h3>❌⭕ Tic Tac Toe</h3>
        <h4>Player Wins: {scores.tttPlayerWins}</h4>
        <h4>Player Losses: {scores.tttPlayerLosses}</h4>
        <h4>Draws: {scores.tttDraws}</h4>
      </div>

      <div className="card">
        <h3>🧠 Memory Game</h3>
        <h4>Wins: {scores.memoryWins}</h4>
        <h4>
          Best Time:{" "}
          {scores.memoryBestTime === null
            ? "Not played yet"
            : `${scores.memoryBestTime} sec`}
        </h4>
      </div>

      <button onClick={resetScores}>Reset All Scores</button>
    </div>
  );
}

export default Scoreboard;
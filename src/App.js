import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GuessNumber from "./pages/GuessNumber";
import RockPaperScissors from "./pages/RockPaperScissors";
import TicTacToe from "./pages/TicTacToe";
import MemoryGame from "./pages/MemoryGame";
import Scoreboard from "./pages/Scoreboard";
import About from "./pages/About";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("home");

  // ✅ Global Scores (Scoreboard reads from here)
  const [scores, setScores] = useState({
    guessBestAttempts: null, // best (minimum) attempts to win
    rpsScore: 0,             // current score
    tttPlayerWins: 0,
    tttPlayerLosses: 0,
    tttDraws: 0,
    memoryWins: 0,
    memoryBestTime: null,
  });

  const resetScores = () => {
    setScores({
      guessBestAttempts: null,
      rpsScore: 0,
      tttPlayerWins: 0,
      tttPlayerLosses: 0,
      tttDraws: 0,
      memoryWins: 0,
      memoryBestTime: null,
    });
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <>
      <Header setPage={setPage} setIsLoggedIn={setIsLoggedIn} />

      {page === "home" && <Home setPage={setPage} />}

      {page === "guess" && (
        <GuessNumber scores={scores} setScores={setScores} />
      )}

      {page === "rps" && (
        <RockPaperScissors scores={scores} setScores={setScores} />
      )}

      {page === "tictactoe" && (
        <TicTacToe scores={scores} setScores={setScores} />
      )}

      {page === "memory" && (
        <MemoryGame scores={scores} setScores={setScores} />
      )}

      {page === "scoreboard" && (
        <Scoreboard scores={scores} resetScores={resetScores} />
      )}

      {page === "about" && <About />}

      <Footer />
    </>
  );
}

export default App;
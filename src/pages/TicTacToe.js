import React, { useState, useEffect } from "react";
import tttBanner from "../assets/images/tic-tac-toe.png";

function TicTacToe({ scores, setScores }) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [playerSymbol, setPlayerSymbol] = useState("");
  const [computerSymbol, setComputerSymbol] = useState("");
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState("Choose X or O to start the game");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const chooseSymbol = (symbol) => {
    const computer = symbol === "X" ? "O" : "X";

    setPlayerSymbol(symbol);
    setComputerSymbol(computer);
    setBoard(Array(9).fill(""));
    setGameStarted(true);
    setGameOver(false);

    if (symbol === "X") {
      setIsPlayerTurn(true);
      setMessage("Your turn");
    } else {
      setIsPlayerTurn(false);
      setMessage("Computer's turn");
    }
  };

  useEffect(() => {
    if (gameStarted && !isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        computerMove();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameStarted, gameOver]);

  const handleClick = (index) => {
    if (!gameStarted || gameOver || !isPlayerTurn) return;
    if (board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);

    if (winner === playerSymbol) {
      setMessage("🏆 You Win!");
      setGameOver(true);
      setScores((prev) => ({
        ...prev,
        tttPlayerWins: prev.tttPlayerWins + 1,
      }));
      return;
    }

    if (newBoard.every((cell) => cell !== "")) {
      setMessage("🤝 It's a Draw!");
      setGameOver(true);
      setScores((prev) => ({
        ...prev,
        tttDraws: prev.tttDraws + 1,
      }));
      return;
    }

    setIsPlayerTurn(false);
    setMessage("Computer's turn");
  };

  const computerMove = () => {
    const emptyIndexes = board
      .map((cell, index) => (cell === "" ? index : null))
      .filter((value) => value !== null);

    if (emptyIndexes.length === 0) return;

    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const newBoard = [...board];
    newBoard[randomIndex] = computerSymbol;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);

    if (winner === computerSymbol) {
      setMessage("💻 Computer Wins!");
      setGameOver(true);
      setScores((prev) => ({
        ...prev,
        tttPlayerLosses: prev.tttPlayerLosses + 1,
      }));
      return;
    }

    if (newBoard.every((cell) => cell !== "")) {
      setMessage("🤝 It's a Draw!");
      setGameOver(true);
      setScores((prev) => ({
        ...prev,
        tttDraws: prev.tttDraws + 1,
      }));
      return;
    }

    setIsPlayerTurn(true);
    setMessage("Your turn");
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setGameStarted(false);
    setGameOver(false);
    setPlayerSymbol("");
    setComputerSymbol("");
    setIsPlayerTurn(true);
    setMessage("Choose X or O to start the game");
  };

  const restartSameSymbols = () => {
    if (!playerSymbol || !computerSymbol) {
      resetGame();
      return;
    }

    setBoard(Array(9).fill(""));
    setGameOver(false);

    if (playerSymbol === "X") {
      setIsPlayerTurn(true);
      setMessage("Your turn");
    } else {
      setIsPlayerTurn(false);
      setMessage("Computer's turn");
    }
  };

  return (
    <div className="container">
      <img src={tttBanner} alt="Tic Tac Toe" className="page-banner" />

      <h2>❌⭕ Tic Tac Toe</h2>
      <p>{message}</p>

      {!gameStarted && (
        <div className="symbol-choice-box">
          <h3>Choose Your Symbol</h3>
          <button onClick={() => chooseSymbol("X")}>Play as X</button>
          <button onClick={() => chooseSymbol("O")}>Play as O</button>
        </div>
      )}

      {gameStarted && (
        <div className="result-box">
          <p><b>You:</b> {playerSymbol}</p>
          <p><b>Computer:</b> {computerSymbol}</p>
          <p><b>Player Wins:</b> {scores.tttPlayerWins}</p>
          <p><b>Player Losses:</b> {scores.tttPlayerLosses}</p>
          <p><b>Draws:</b> {scores.tttDraws}</p>
        </div>
      )}

      <div className="ttt-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="ttt-cell"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button onClick={restartSameSymbols}>Restart Round</button>
      <button onClick={resetGame}>Reset Full Game</button>
    </div>
  );
}

export default TicTacToe;
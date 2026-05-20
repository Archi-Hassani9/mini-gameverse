import React from "react";
import guessImg from "../assets/images/number-guessing.png";
import rpsImg from "../assets/images/rps-banner.png";
import tttImg from "../assets/images/tic-tac-toe.png";
import memoryImg from "../assets/images/memory-banner.png";

function Home({ setPage }) {
  const games = [
    {
      name: "Number Guessing Game",
      page: "guess",
      image: guessImg,
      description: "Test your luck and logic by guessing the hidden number."
    },
    {
      name: "Rock Paper Scissors",
      page: "rps",
      image: rpsImg,
      description: "Challenge the computer in this fast and fun classic game."
    },
    {
      name: "Tic Tac Toe",
      page: "tictactoe",
      image: tttImg,
      description: "Play the timeless X and O strategy game."
    },
    {
      name: "Memory Card Flip",
      page: "memory",
      image: memoryImg,
      description: "Match the cards and test your memory power."
    }
  ];

  return (
    <div className="home-scroll-container">
      <h1 className="home-title">Welcome to GameVerse</h1>
      <p className="home-subtitle">Scroll down and choose your next neon challenge</p>

      {games.map((game, index) => (
        <div key={index} className="game-showcase">
          <img src={game.image} alt={game.name} className="showcase-image" />

          <div className="showcase-content">
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <button onClick={() => setPage(game.page)}>Play Now</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
import React, { useState, useEffect } from "react";
import memoryBanner from "../assets/images/memory-banner.png";

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function MemoryGame({ scores, setScores }) {
  const emojis = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒"];

  const createCards = () => {
    const pairs = [...emojis, ...emojis].map((emoji, index) => ({
      id: index + 1,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    return shuffleArray(pairs);
  };

  const [cards, setCards] = useState(createCards());
  const [firstIndex, setFirstIndex] = useState(null);
  const [secondIndex, setSecondIndex] = useState(null);
  const [message, setMessage] = useState("Click Start Game to begin!");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [time, setTime] = useState(0);

  // Stopwatch
  useEffect(() => {
    let timer;

    if (isGameStarted && !isGameFinished) {
      timer = setInterval(() => {
        setTime((prevTime) => +(prevTime + 0.1).toFixed(1));
      }, 100);
    }

    return () => clearInterval(timer);
  }, [isGameStarted, isGameFinished]);

  const startGame = () => {
    setCards(createCards());
    setFirstIndex(null);
    setSecondIndex(null);
    setMessage("Flip two cards to match!");
    setIsGameStarted(true);
    setIsGameFinished(false);
    setTime(0);
  };

  const handleFlip = (index) => {
    if (!isGameStarted || isGameFinished) return;
    if (secondIndex !== null) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    const updated = [...cards];
    updated[index].isFlipped = true;
    setCards(updated);

    if (firstIndex === null) {
      setFirstIndex(index);
      setMessage("Pick one more card...");
    } else {
      setSecondIndex(index);
      setMessage("Checking...");
      checkMatch(firstIndex, index, updated);
    }
  };

  const checkMatch = (i1, i2, updatedCards) => {
    const first = updatedCards[i1];
    const second = updatedCards[i2];

    setTimeout(() => {
      const newCards = [...updatedCards];

      if (first.emoji === second.emoji) {
        newCards[i1].isMatched = true;
        newCards[i2].isMatched = true;
        setMessage("✅ Matched!");
      } else {
        newCards[i1].isFlipped = false;
        newCards[i2].isFlipped = false;
        setMessage("❌ Not matched, try again!");
      }

      setCards(newCards);
      setFirstIndex(null);
      setSecondIndex(null);

      const allMatched = newCards.every((c) => c.isMatched);

      if (allMatched) {
        const finalTime = parseFloat(time.toFixed(1));

        setIsGameFinished(true);
        setMessage(`🏆 You matched all cards in ${finalTime} sec!`);

        setScores((prev) => ({
          ...prev,
          memoryWins: prev.memoryWins + 1,
          memoryBestTime:
            prev.memoryBestTime === null
              ? finalTime
              : Math.min(parseFloat(prev.memoryBestTime), finalTime),
        }));
      }
    }, 800);
  };

  const resetGame = () => {
    setCards(createCards());
    setFirstIndex(null);
    setSecondIndex(null);
    setMessage("Click Start Game to begin!");
    setIsGameStarted(false);
    setIsGameFinished(false);
    setTime(0);
  };

  return (
    <div className="container">
      <img src={memoryBanner} alt="Memory Game" className="page-banner" />
      <h2>🧠 Memory Card Flip Game</h2>
      <p>{message}</p>

      <div className="result-box">
        <h3>⏱ Time: {time.toFixed(1)} sec</h3>
        <p>
          Best Time:{" "}
          {scores.memoryBestTime === null
            ? "Not played yet"
            : `${scores.memoryBestTime} sec`}
        </p>
      </div>

      <br />
      <button onClick={startGame}>Start Game</button>
      <button onClick={resetGame}>Reset Game</button>

      <div className="memory-grid">
        {cards.map((card, index) => (
          <button
            key={card.id}
            className={`memory-card ${card.isMatched ? "matched" : ""}`}
            onClick={() => handleFlip(index)}
          >
            {card.isFlipped || card.isMatched ? card.emoji : "❓"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
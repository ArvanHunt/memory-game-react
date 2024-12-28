import React, { useState, useEffect } from "react";
import Card from "./components/Card";

const generateCards = (level) => {
  const icons = ["HTML", "CSS", "JS", "TS", "REACT", "C++", "C", "DS"];
  const selectedIcons = icons.slice(0, level);
  const cards = [...selectedIcons, ...selectedIcons].map((icon, index) => ({
    id: index,
    icon,
    flipped: false,
    matched: false,
  }));
  return cards.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(4); // Easy: 4 pairs

  // Initialize or restart the game
  const startNewGame = () => {
    setCards(generateCards(difficulty));
    setFlippedCards([]);
    setAttempts(0);
    setTime(0);
    setGameOver(false);
  };

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Timer
  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [gameOver]);

  const handleCardClick = (cardId) => {
    const newCards = [...cards];
    const cardIndex = cards.findIndex((card) => card.id === cardId);

    if (newCards[cardIndex].flipped || newCards[cardIndex].matched) return;

    newCards[cardIndex].flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, newCards[cardIndex]];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setAttempts(attempts + 1);

      if (newFlippedCards[0].icon === newFlippedCards[1].icon) {
        newFlippedCards.forEach((card) => {
          const index = newCards.findIndex((c) => c.id === card.id);
          newCards[index].matched = true;
        });
      } else {
        setTimeout(() => {
          newFlippedCards.forEach((card) => {
            const index = newCards.findIndex((c) => c.id === card.id);
            newCards[index].flipped = false;
          });
          setCards(newCards);
        }, 1000);
      }

      setFlippedCards([]);
    }

    if (newCards.every((card) => card.matched)) {
      setGameOver(true);
    }
  };

  return (
    <>
    <div className="h-screen bg-purple-200">
    <select
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          className="mt-3 p-2 border rounded "
        >
          <option value={4}>Easy</option>
          <option value={6}>Medium</option>
          <option value={8}>Hard</option>
        </select>
    <div className=" bg-purple-200 border-dashed border-2 border-purple-950 ml-80 mr-80 mb-5">
      
      <h1 className="text-4xl font-bold text-center mb-5 text-purple-600">Memory Game</h1>
      <div className="text-center mb-5">
        <p>Time: {time}s</p>
        <p>Attempts: {attempts}</p>
        
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => handleCardClick(card.id)} />
        ))}
      </div>
      <div className="text-center mt-5">
        {gameOver && (
          <p className="text-xl font-bold mb-3">
            Congratulations! You completed the game in {time}s and {attempts} attempts.
          </p>
        )}
        <button
          onClick={startNewGame}
          className="px-4 py-2 mb-4 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          New Game
        </button>
      </div>
    </div>
    </div>
    </>
  );
};

export default App;

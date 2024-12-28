import React from "react";

const Card = ({ card, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-20 h-28 flex items-center justify-center border rounded-lg shadow-md cursor-pointer ${
        card.flipped || card.matched ? "bg-purple-200" : "bg-purple-500"
      }`}
    >
      {card.flipped || card.matched ? (
        <span className="text-2xl">{card.icon}</span>
      ) : (
        <span className="text-purple-950 text-lg">?</span>
      )}
    </div>
  );
};

export default Card;

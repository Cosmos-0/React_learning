import React, { useState } from 'react';
import './App.css';

const Square = ({ value, onClick }) => {
  const className = `square ${value === 'X' ? 'x' : value === 'O' ? 'o' : ''}`;
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    console.log(newSquares); // This should print the updated squares array
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="reset-button" onClick={handleReset}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Game;

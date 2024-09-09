import React, { useState } from 'react';

const initialBoard = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const calculateWinner = (board) => {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }

    if (!newBoard.includes(null)) {
      setWinner('draw');
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    // AI's turn (if it's O's turn)
    if (currentPlayer === 'O') {
      setTimeout(() => {
        makeAiMove(newBoard);
      }, 500); // Add a slight delay for a more natural feel
    }
  };

  const makeAiMove = (currentBoard) => {
    // Simple AI: Choose a random empty square
    const emptySquares = currentBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);

    if (emptySquares.length > 0) {
      const randomIndex =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      handleClick(randomIndex);
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      {winner && (
        <div className="winner">
          {winner === 'draw' ? "It's a draw!" : `Winner: ${winner}`}
        </div>
      )}
      <div className="board">
        {board.map((value, index) => renderSquare(index))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;

import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

interface TicTacToeProps {
  selectedPlayer: null | string;
}

const TicTacToe = ({ selectedPlayer }: TicTacToeProps) => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [isCPUNext, setIsCPUNext] = useState(false);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    if (winner) return;
    if (isCPUNext) {
      cpuPlayer();
    }
  }, [isCPUNext]);

  const players = {
    CPU: {
      SYM: 'O',
      NAME: 'CPU',
    },
    HUMAN: {
      SYM: 'X',
      NAME: 'You',
    },
  };

  function sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  function cpuPlayer() {
    if (winner) return;
    sleep(1000);

    const cpuMove = getCpuTurn();

    board[cpuMove.arrayIndex][cpuMove.index] = players?.CPU?.SYM;

    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(false);
  }

  function getCpuTurn() {
    const emptyIndexes: { arrayIndex: number; index: number }[] = [];
    board.forEach((row: string[], arrayIndex: number) => {
      row.forEach((cell: string, index: number) => {
        if (cell === '') {
          emptyIndexes.push({ arrayIndex, index });
        }
      });
    });
    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
  }

  function playRound(arrayIndex: number, index: number) {
    if (isCPUNext) return;
    if (winner) return;
    board[arrayIndex][index] = players?.HUMAN?.SYM;
    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(true);
  }

  function checkWinner() {
    // check same row
    for (let index = 0; index < board.length; index++) {
      const row = board[index];
      if (row.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.NAME);
        return;
      } else if (row.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.NAME);
        return;
      }
    }

    // check same column
    for (let i = 0; i < 3; i++) {
      const column = board.map((row) => row[i]);
      if (column.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.NAME);
        return;
      } else if (column.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.NAME);
        return;
      }
    }

    // check same diagonal
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (diagonal1.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.NAME);
      return;
    } else if (diagonal1.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.NAME);
      return;
    } else if (diagonal2.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.NAME);
      return;
    } else if (diagonal2.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.NAME);
      return;
    } else if (board.flat().every((cell) => cell !== '')) {
      setWinner('draw');
      return;
    } else {
      setWinner('');
      return;
    }
  }

  function displayWinner() {
    if (winner === 'draw') {
      return "It's a draw!";
    } else if (winner) {
      return `${winner} won!`;
    }
  }

  const displayTurn = () => {
    if (isCPUNext) {
      return `${selectedPlayer}'S TURN`;
    } else {
      return `${selectedPlayer}'S TURN`;
    }
  };

  function playAgain() {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinner('');
    setIsCPUNext(false);
  }

  return (
    <div className="container">
      <div className="current-turn" data-testid="turn-display">
        {displayTurn()}
      </div>
      <div className="board" data-testid="tictactoe-board">
        <div className="board-row" data-testid="row-0">
          <span
            onClick={() => playRound(0, 0)}
            className="cell border-bottom border-right"
            data-testid="cell-0-0"
          >
            {board[0][0]}
          </span>
          <span
            onClick={() => playRound(0, 1)}
            className="cell border-bottom border-right"
            data-testid="cell-0-1"
          >
            {board[0][1]}
          </span>
          <span
            onClick={() => playRound(0, 2)}
            className="cell border-bottom"
            data-testid="cell-0-2"
          >
            {board[0][2]}
          </span>
        </div>
        <div className="board-row" data-testid="row-1">
          <span
            onClick={() => playRound(1, 0)}
            className="cell border-bottom border-right"
            data-testid="cell-1-0"
          >
            {board[1][0]}
          </span>
          <span
            onClick={() => playRound(1, 1)}
            className="cell border-bottom border-right"
            data-testid="cell-1-1"
          >
            {board[1][1]}
          </span>
          <span
            onClick={() => playRound(1, 2)}
            className="cell border-bottom"
            data-testid="cell-1-2"
          >
            {board[1][2]}
          </span>
        </div>
        <div className="board-row" data-testid="row-2">
          <span
            onClick={() => playRound(2, 0)}
            className="cell border-right"
            data-testid="cell-2-0"
          >
            {board[2][0]}
          </span>
          <span
            onClick={() => playRound(2, 1)}
            className="cell border-right"
            data-testid="cell-2-1"
          >
            {board[2][1]}
          </span>
          <span
            onClick={() => playRound(2, 2)}
            className="cell"
            data-testid="cell-2-2"
          >
            {board[2][2]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;

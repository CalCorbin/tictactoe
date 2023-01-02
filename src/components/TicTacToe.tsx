import React, { useState, useEffect, useCallback } from 'react';
import './TicTacToe.css';
import ToastNotification from './ToastNotification';

interface TicTacToeProps {
  selectedPlayer: string;
}

const TicTacToe = ({ selectedPlayer }: TicTacToeProps) => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [isCpuNext, setIsCpuNext] = useState(false);
  const [winner, setWinner] = useState('');

  const opponent = selectedPlayer === 'x' ? 'O' : 'X';
  const players = {
    CPU: {
      SYM: opponent,
      NAME: 'CPU',
    },
    HUMAN: {
      SYM: selectedPlayer,
      NAME: 'You',
    },
  };

  /**
   * This function handles calculating the next move for the CPU.
   */
  const getCpuTurn = useCallback(() => {
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
  }, [board]);

  /**
   * This function handles checking if a player has won the game.
   */
  const checkForWinner = useCallback(() => {
    // Check rows for a winning playing.
    for (let index = 0; index < board.length; index++) {
      const row = board[index];
      if (row.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.SYM);
        return;
      } else if (row.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.SYM);
        return;
      }
    }

    // Check columns for a winning play.
    for (let i = 0; i < 3; i++) {
      const column = board.map((row) => row[i]);
      if (column.every((cell) => cell === players?.CPU?.SYM)) {
        setWinner(players?.CPU?.SYM);
        return;
      } else if (column.every((cell) => cell === players?.HUMAN?.SYM)) {
        setWinner(players?.HUMAN?.SYM);
        return;
      }
    }

    // Check diagonally for a winning play.
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (diagonal1.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.SYM);
      return;
    } else if (diagonal1.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.SYM);
      return;
    } else if (diagonal2.every((cell) => cell === players?.CPU?.SYM)) {
      setWinner(players?.CPU?.SYM);
      return;
    } else if (diagonal2.every((cell) => cell === players?.HUMAN?.SYM)) {
      setWinner(players?.HUMAN?.SYM);
      return;
    } else if (board.flat().every((cell) => cell !== '')) {
      setWinner('draw');
      return;
    } else {
      setWinner('');
      return;
    }
  }, [board, players]);

  /**
   * This function is called when it's the CPU's turn.
   */
  const playCpuTurn = useCallback(() => {
    const cpuMove = getCpuTurn();

    board[cpuMove.arrayIndex][cpuMove.index] = players?.CPU?.SYM;

    setBoard((board) => [...board]);
    checkForWinner();
    setIsCpuNext(false);
  }, [getCpuTurn, checkForWinner, setBoard, board, players]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (winner) return;
    if (isCpuNext) {
      setTimeout(() => {
        playCpuTurn();
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [playCpuTurn, board, winner, isCpuNext]);

  /**
   * This function handles the player's turn.
   * @param row {number} - The row selected by the player.
   * @param index {number} - The index within the row selected by the player.
   */
  const playRound = (row: number, index: number) => {
    if (isCpuNext) return;
    if (winner) return;
    board[row][index] = players?.HUMAN?.SYM;
    setBoard((board) => [...board]);
    checkForWinner();
    setIsCpuNext(true);
  };

  /**
   * This function handles the display text for the winner.
   */
  const displayWinner = () => {
    if (winner === 'draw') {
      return "IT'S A DRAW!";
    } else if (winner) {
      return `${winner} WINS!`;
    }
  };

  const displayTurn = () => {
    if (isCpuNext) {
      return `${opponent}'S TURN`;
    } else {
      return `${selectedPlayer}'S TURN`;
    }
  };

  const playAgain = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinner('');
    setIsCpuNext(false);
  };

  return (
    <div className="container">
      <ToastNotification message={'NOW IN GAME'} deleteTime={2000} />
      <div className="current-turn" data-testid="turn-display">
        {winner ? displayWinner() : displayTurn()}
      </div>
      <div data-testid="tictactoe-screen">
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
      {winner && (
        <div className="post-game-container">
          <button className="game-button" onClick={playAgain}>
            PLAY AGAIN
          </button>
          <button className="game-button">SEE RECORD</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;

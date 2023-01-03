import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './TicTacToe.css';
import ToastNotification from './ToastNotification';

export type PlayerOption = 'X' | 'O' | '';
interface TicTacToeProps {
  selectedPlayer: PlayerOption;
}
type GameRecord = Record<PlayerOption, number>;
type Players = Record<'CPU' | 'HUMAN', PlayerOption>;

const TicTacToe = ({ selectedPlayer }: TicTacToeProps) => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [isCpuNext, setIsCpuNext] = useState(false);
  const [winner, setWinner] = useState('');
  const [record, setRecord] = useState<GameRecord>({
    X: 0,
    O: 0,
    '': 0,
  });

  const opponent: PlayerOption = selectedPlayer === 'X' ? 'O' : 'X';
  const players = useMemo<Players>(
    () => ({
      CPU: selectedPlayer,
      HUMAN: opponent,
    }),
    [selectedPlayer, opponent]
  );

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
      if (row.every((cell) => cell === players?.CPU)) {
        setWinner(players?.CPU);
        setRecord({
          ...record,
          [players?.CPU]: record[players?.CPU] + 1,
        });
        return;
      } else if (row.every((cell) => cell === players?.HUMAN)) {
        setWinner(players?.HUMAN);
        setRecord({
          ...record,
          [players?.HUMAN]: record[players?.HUMAN] + 1,
        });
        return;
      }
    }

    // Check columns for a winning play.
    for (let i = 0; i < 3; i++) {
      const column = board.map((row) => row[i]);
      if (column.every((cell) => cell === players?.CPU)) {
        setWinner(players?.CPU);
        setRecord({
          ...record,
          [players?.CPU]: record[players?.CPU === 'X' ? 'X' : 'O'] + 1,
        });
        return;
      } else if (column.every((cell) => cell === players?.HUMAN)) {
        setWinner(players?.HUMAN);
        setRecord({
          ...record,
          [players?.HUMAN]: record[players?.HUMAN === 'X' ? 'X' : 'O'] + 1,
        });
        return;
      }
    }

    // Check diagonally for a winning play.
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (diagonal1.every((cell) => cell === players?.CPU)) {
      setWinner(players?.CPU);
      setRecord({
        ...record,
        [players?.CPU]: record[players?.CPU === 'X' ? 'X' : 'O'] + 1,
      });
      return;
    } else if (diagonal1.every((cell) => cell === players?.HUMAN)) {
      setWinner(players?.HUMAN);
      setRecord({
        ...record,
        [players?.HUMAN]: record[players?.HUMAN === 'X' ? 'X' : 'O'] + 1,
      });
      return;
    } else if (diagonal2.every((cell) => cell === players?.CPU)) {
      setWinner(players?.CPU);
      setRecord({
        ...record,
        [players?.CPU]: record[players?.CPU === 'X' ? 'X' : 'O'] + 1,
      });
      return;
    } else if (diagonal2.every((cell) => cell === players?.HUMAN)) {
      setWinner(players?.HUMAN);
      setRecord({
        ...record,
        [players?.HUMAN]: record[players?.HUMAN === 'X' ? 'X' : 'O'] + 1,
      });
      return;
    } else if (board.flat().every((cell) => cell !== '')) {
      setWinner('draw');
      return;
    } else {
      setWinner('');
      return;
    }
  }, [record, board, players]);

  /**
   * This function is called when it's the CPU's turn.
   */
  const playCpuTurn = useCallback(() => {
    const cpuMove = getCpuTurn();

    board[cpuMove.arrayIndex][cpuMove.index] = players?.CPU;

    setBoard((board) => [...board]);
    checkForWinner();
    setIsCpuNext(false);
  }, [getCpuTurn, checkForWinner, setBoard, board, players]);

  /**
   * This function handles the player's turn.
   * @param row {number} - The row selected by the player.
   * @param index {number} - The index within the row selected by the player.
   */
  const playRound = (row: number, index: number) => {
    if (isCpuNext) return;
    if (winner) return;
    board[row][index] = players?.HUMAN;
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

  /**
   * This function handles displaying the current players turn.
   */
  const displayTurn = () => {
    if (isCpuNext) {
      return `${opponent}'S TURN`;
    } else {
      return `${selectedPlayer}'S TURN`;
    }
  };

  /**
   * This function handles resetting the game.
   */
  const playAgain = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinner('');
    setIsCpuNext(false);
  };

  /**
   * This useEffect handles updating the board to simulate the CPU's turn.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (winner) return;
    if (isCpuNext) {
      // Here we use setTimeout to simulate the CPU's turn, 2000 milliseconds gives
      // the appearance of the CPU thinking.
      setTimeout(() => {
        playCpuTurn();
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [playCpuTurn, board, winner, isCpuNext]);

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

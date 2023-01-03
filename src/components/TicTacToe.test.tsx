import { render, screen } from '@testing-library/react';
import TicTacToe, { PlayerOption } from './TicTacToe';

describe('TicTacToe', () => {
  it('renders TicTacToe component', () => {
    const playerOption: PlayerOption = 'X';
    render(<TicTacToe selectedPlayer={playerOption} />);
    expect(screen.getByTestId('tictactoe-screen')).toBeInTheDocument();
  });
});

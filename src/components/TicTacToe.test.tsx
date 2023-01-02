import { render, screen } from '@testing-library/react';
import TicTacToe from './TicTacToe';

describe('TicTacToe', () => {
  it('renders TicTacToe component', () => {
    render(<TicTacToe selectedPlayer="x" />);
    expect(screen.getByTestId('tictactoe-board')).toBeInTheDocument();
  });
});

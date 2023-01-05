import { render, screen, waitFor } from '@testing-library/react';
import TicTacToe, { PlayerOption } from './TicTacToe';

describe('TicTacToe', () => {
  it('renders TicTacToe component', () => {
    const playerOption: PlayerOption = 'X';
    render(<TicTacToe selectedPlayer={playerOption} />);
    expect(screen.getByTestId('tictactoe-screen')).toBeInTheDocument();
  });
  it('should render correct player option when player clicks a cell during the game', async () => {
    render(<TicTacToe selectedPlayer="O" />);

    const cell = screen.getByTestId('cell-0-0');
    cell.click();
    await waitFor(() => {
      expect(cell.textContent).toBe('O');
    });
    expect(cell.textContent).toBe('O');
  });
});

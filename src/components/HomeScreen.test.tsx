import { render, screen, waitFor } from '@testing-library/react';
import HomeScreen from './HomeScreen';

describe('Homescreen', () => {
  const setup = () => render(<HomeScreen />);

  it('renders Homescreen component', () => {
    setup();
    expect(screen.getByTestId('homescreen')).toBeInTheDocument();
  });

  it('updates active player when player is selected', async () => {
    setup();
    const playerX = screen.getByText('X');
    const playerO = screen.getByText('O');
    let playerXUnderline = screen.getByTestId('player-x-underline');
    let playerOUnderline = screen.getByTestId('player-o-underline');

    expect(playerXUnderline).not.toHaveClass('active');
    expect(playerOUnderline).not.toHaveClass('active');

    playerX.click();
    await waitFor(() => {
      playerXUnderline = screen.getByTestId('player-x-underline');
      expect(playerXUnderline).toHaveClass('active');
    });
    expect(playerOUnderline).not.toHaveClass('active');

    playerO.click();
    await waitFor(() => {
      playerOUnderline = screen.getByTestId('player-o-underline');
      expect(playerOUnderline).toHaveClass('active');
    });
    expect(playerXUnderline).not.toHaveClass('active');
  });
});

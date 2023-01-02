import { render, screen, waitFor } from '@testing-library/react';
import MatchScreen from './MatchScreen';

describe('MatchScreen', () => {
  const setup = () => render(<MatchScreen />);
  it('renders MatchScreen component', () => {
    setup();
    expect(
      screen.getByText('Waiting to find your opponent...')
    ).toBeInTheDocument();
  });
});

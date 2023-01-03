import { render, screen } from '@testing-library/react';
import RecordScreen from './RecordScreen';

describe('RecordScreen', () => {
  const setup = () => render(<RecordScreen />);

  it('renders RecordScreen component', () => {
    setup();
    expect(
      screen.getByText(/This screen will display the players record/)
    ).toBeInTheDocument();
  });
});

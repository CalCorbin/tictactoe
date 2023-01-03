import { render, screen } from '@testing-library/react';
import RecordScreen from './RecordScreen';

describe('RecordScreen', () => {
  const setup = () => render(<RecordScreen />);

  it('renders RecordScreen component', () => {
    setup();
    expect(screen.getByText(/yay/)).toBeInTheDocument();
  });
});

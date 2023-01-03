import { render, screen, waitFor } from '@testing-library/react';
import ToastNotification from './ToastNotification';

describe('ToastNotification', () => {
  it('renders a message', () => {
    render(<ToastNotification message="Hello world" deleteTime={2000} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('should disappear after 1 second', async () => {
    render(
      <div>
        <ToastNotification message="Hello world" deleteTime={1000} />
      </div>
    );

    let toast = screen.getByText('Hello world');
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveClass('visible');

    await waitFor(
      () => {
        toast = screen.getByText('Hello world');
        expect(toast).not.toHaveClass('visible');
      },
      { timeout: 2000 }
    );
  });
});

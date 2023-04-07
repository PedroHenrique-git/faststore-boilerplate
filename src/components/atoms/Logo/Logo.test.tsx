import { config } from '@config/store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Logo } from './Logo';

describe('<Logo />', () => {
  it('should be in the document', () => {
    render(<Logo />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('should render the store name', () => {
    render(<Logo />);

    expect(screen.getByText(config.base.storeName)).toBeInTheDocument();
  });

  it('should go to home when clicked', async () => {
    render(<Logo />);

    await userEvent.click(screen.getByTestId('logo'));

    expect(window.location.pathname).toBe('/');
  });
});

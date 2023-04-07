import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuMobile } from './MenuMobile';
import { menuLinks } from './menu-links';

describe('<MenuMobile />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should be in the document', () => {
    render(<MenuMobile menuLinks={menuLinks} />);

    expect(screen.getByTestId('open-menu-mobile')).toBeInTheDocument();
  });

  it('should be in the document even when menuLinks is undefined', () => {
    render(<MenuMobile />);

    expect(screen.getByTestId('open-menu-mobile')).toBeInTheDocument();
  });

  it('should open the drawer when clicked', async () => {
    render(<MenuMobile menuLinks={menuLinks} />);

    await userEvent.click(screen.getByTestId('open-menu-mobile'));

    expect(screen.getByTestId('drawer-menu-mobile')).toBeInTheDocument();
  });

  it('should render the correct number of list items', async () => {
    render(<MenuMobile menuLinks={menuLinks} />);

    await userEvent.click(screen.getByTestId('open-menu-mobile'));

    expect(screen.getByRole('list').children.length).toBe(3);
  });
});

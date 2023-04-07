import { render, screen } from '@testing-library/react';
import { MenuDesktop } from './MenuDesktop';
import { menuLinks } from './menu-links';

describe('<MenuDesktop />', () => {
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
    render(<MenuDesktop menuLinks={menuLinks} />);

    expect(screen.getByTestId('menu-desktop')).toBeInTheDocument();
  });

  it('should be in the document even when menu links is undefined', () => {
    render(<MenuDesktop />);

    expect(screen.getByTestId('menu-desktop')).toBeInTheDocument();
  });

  it('should render the correct number of list items', () => {
    render(<MenuDesktop menuLinks={menuLinks} />);

    expect(
      screen.getByTestId('menu-desktop').firstElementChild?.firstElementChild
        ?.children.length,
    ).toBe(3);
  });
});

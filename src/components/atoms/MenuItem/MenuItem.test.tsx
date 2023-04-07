import { List } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { MenuItem } from './MenuItem';

describe('<MenuItem />', () => {
  const item = { href: '/test', text: 'test' };

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <List>{children}</List>;
  };

  it('should be in the document', () => {
    render(
      <Wrapper>
        <MenuItem {...item} />
      </Wrapper>,
    );

    expect(screen.getByTestId('menu-item')).toBeInTheDocument();
  });

  it('should render the correct item', () => {
    render(
      <Wrapper>
        <MenuItem {...item} />
      </Wrapper>,
    );

    expect(
      screen.getByTestId('menu-item').firstElementChild?.getAttribute('href'),
    ).toBe('/test');

    expect(screen.getByTestId('menu-item').firstElementChild?.textContent).toBe(
      'test',
    );
  });

  it('should render even when href is undefined', () => {
    render(
      <Wrapper>
        <MenuItem text={item.text} />
      </Wrapper>,
    );

    expect(screen.getByTestId('menu-item')).toBeInTheDocument();
  });

  it('should render even when text is undefined', () => {
    render(
      <Wrapper>
        <MenuItem href={item.href} />
      </Wrapper>,
    );

    expect(screen.getByTestId('menu-item')).toBeInTheDocument();
  });

  it('should render even when text and href is undefined', () => {
    render(
      <Wrapper>
        <MenuItem />
      </Wrapper>,
    );

    expect(screen.getByTestId('menu-item')).toBeInTheDocument();
  });
});

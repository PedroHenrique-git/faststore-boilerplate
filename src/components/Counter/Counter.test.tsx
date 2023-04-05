import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('<Counter />', () => {
  it('should be in the document', () => {
    render(<Counter />);

    expect(screen.getByTestId('counter')).toBeInTheDocument();
  });

  it('counter show 1', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText(/add/i));
    expect(screen.getByText(/\d/i).textContent).toBe('1');
  });

  it('counter show -1', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText(/remove/i));
    expect(screen.getByText(/\d/i).textContent).toBe('-1');
  });
});

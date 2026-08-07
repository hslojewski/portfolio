import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

vi.mock('./Content', () => ({
  default: (props) => <div data-testid="content-mock">{JSON.stringify(props)}</div>,
}));

describe('Home', () => {
  it('sets document.title to "Heidi Slojewski | Web Developer & Product Manager"', () => {
    render(<Home />);
    expect(document.title).toBe('Heidi Slojewski | Web Developer & Product Manager');
  });

  it('renders Content with the home page props', () => {
    render(<Home />);
    const props = JSON.parse(screen.getByTestId('content-mock').textContent);
    expect(props.projectPath).toBe('home');
    expect(props.title).toBe('Heidi Slojewski');
    expect(props.titleAlignment).toBe('center');
  });
});

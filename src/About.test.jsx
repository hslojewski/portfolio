import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

vi.mock('./Content', () => ({
  default: (props) => <div data-testid="content-mock">{JSON.stringify(props)}</div>,
}));

describe('About', () => {
  it('sets document.title to "About | Heidi Slojewski"', () => {
    render(<About />);
    expect(document.title).toBe('About | Heidi Slojewski');
  });

  it('renders Content with the about page props', () => {
    render(<About />);
    const props = JSON.parse(screen.getByTestId('content-mock').textContent);
    expect(props.title).toBe("Hi! I'm Heidi");
    expect(props.projectPath).toBe('about');
    expect(props.projectAmount).toBe(8);
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './Nav';

const renderNav = (props = {}) => render(
  <MemoryRouter>
    <Nav
      colorMode="light"
      isNavVisible={false}
      toggleColorMode={vi.fn()}
      toggleNav={vi.fn()}
      closeNav={vi.fn()}
      {...props}
    />
  </MemoryRouter>
);

describe('Nav', () => {
  it('renders links to home, about, and projects', () => {
    renderNav();
    expect(screen.getByRole('link', { name: 'Heidi Slojewski' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  });

  it('hides secondary nav items behind "hide-on-mobile" until isNavVisible is true', () => {
    const { container, rerender } = renderNav({ isNavVisible: false });
    expect(container.querySelector('ul')).toHaveClass('hide-on-mobile');

    rerender(
      <MemoryRouter>
        <Nav
          colorMode="light"
          isNavVisible={true}
          toggleColorMode={vi.fn()}
          toggleNav={vi.fn()}
          closeNav={vi.fn()}
        />
      </MemoryRouter>
    );
    expect(container.querySelector('ul')).not.toHaveClass('hide-on-mobile');
  });

  it('shows "Switch to Dark Mode" in light mode and calls toggleColorMode when clicked', () => {
    const toggleColorMode = vi.fn();
    const { container } = renderNav({ colorMode: 'light', toggleColorMode });
    const colorModeLink = container.querySelector('.colorMode a');
    expect(colorModeLink).toHaveAttribute('aria-label', 'Switch to Dark Mode');
    fireEvent.click(colorModeLink);
    expect(toggleColorMode).toHaveBeenCalledTimes(1);
  });

  it('shows "Switch to Light Mode" in dark mode', () => {
    const { container } = renderNav({ colorMode: 'dark' });
    expect(container.querySelector('.colorMode a')).toHaveAttribute('aria-label', 'Switch to Light Mode');
  });

  it('calls toggleNav when the mobile menu button is clicked', () => {
    const toggleNav = vi.fn();
    const { container } = renderNav({ toggleNav });
    fireEvent.click(container.querySelector('.menu'));
    expect(toggleNav).toHaveBeenCalledTimes(1);
  });

  it('calls toggleNav when Enter is pressed on the mobile menu button', () => {
    const toggleNav = vi.fn();
    const { container } = renderNav({ toggleNav });
    fireEvent.keyUp(container.querySelector('.menu'), { key: 'Enter' });
    expect(toggleNav).toHaveBeenCalledTimes(1);
  });
});

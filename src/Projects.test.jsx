import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Projects from './Projects';
import { AppProvider } from './AppContext';

vi.mock('./TagsList', () => ({
  default: ({ title }) => <div data-testid={`tagslist-${title}`} />,
}));
vi.mock('./FilteredProjects', () => ({
  default: (props) => <div data-testid="filtered-projects">{JSON.stringify(props)}</div>,
}));

const renderProjects = (contextOverrides = {}) => {
  const clearActiveTags = vi.fn();
  const contextValue = {
    clearActiveTags,
    activeTags: {},
    projects: {},
    filterType: 'AND',
    ...contextOverrides,
  };
  const rendered = render(
    <AppProvider value={contextValue}>
      <Projects />
    </AppProvider>
  );
  return { ...rendered, clearActiveTags };
};

describe('Projects', () => {
  it('sets document.title to "Projects | Heidi Slojewski"', () => {
    renderProjects();
    expect(document.title).toBe('Projects | Heidi Slojewski');
  });

  it('renders a TagsList for each category', () => {
    renderProjects();
    expect(screen.getByTestId('tagslist-Roles')).toBeInTheDocument();
    expect(screen.getByTestId('tagslist-Affiliations')).toBeInTheDocument();
    expect(screen.getByTestId('tagslist-Tools')).toBeInTheDocument();
    expect(screen.getByTestId('tagslist-Skills')).toBeInTheDocument();
  });

  it('shows a count of 0 active filters and disables "Clear all filters" when none are active', () => {
    renderProjects({ activeTags: {} });
    expect(screen.getByText('(0)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear all filters' })).toHaveClass('disabled');
  });

  it('shows the total count of active filters across categories and enables clearing', () => {
    renderProjects({ activeTags: { tools: ['Squarespace', 'WordPress'], roles: ['Designer'] } });
    expect(screen.getByText('(3)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear all filters' })).not.toHaveClass('disabled');
  });

  it('calls clearActiveTags when "Clear all filters" is clicked', () => {
    const { clearActiveTags } = renderProjects({ activeTags: { tools: ['Squarespace'] } });
    fireEvent.click(screen.getByRole('button', { name: 'Clear all filters' }));
    expect(clearActiveTags).toHaveBeenCalledTimes(1);
  });

  it('calls clearActiveTags on unmount', () => {
    const { unmount, clearActiveTags } = renderProjects();
    unmount();
    expect(clearActiveTags).toHaveBeenCalledTimes(1);
  });

  it('passes projects, activeTags, and filterType through to FilteredProjects', () => {
    renderProjects({
      projects: { 'project-a': { title: 'Project A' } },
      activeTags: { tools: ['Squarespace'] },
      filterType: 'OR',
    });
    const props = JSON.parse(screen.getByTestId('filtered-projects').textContent);
    expect(props.projects).toEqual({ 'project-a': { title: 'Project A' } });
    expect(props.activeTags).toEqual({ tools: ['Squarespace'] });
    expect(props.filterType).toBe('OR');
  });
});

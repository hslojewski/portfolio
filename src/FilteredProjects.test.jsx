import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FilteredProjects from './FilteredProjects';
import { AppProvider } from './AppContext';

const projects = {
  'project-a': { title: 'Project A', thumbnail: 'a.png', thumbnail_alt: 'A thumb', tools: ['Squarespace'], date: 2020 },
  'project-b': { title: 'Project B', thumbnail: 'b.png', thumbnail_alt: 'B thumb', tools: ['WordPress'], affiliations: ['Self'], date: 2021 },
  'project-c': { title: 'Project C', thumbnail: 'c.png', thumbnail_alt: 'C thumb', tools: ['Squarespace'], affiliations: ['Self'], date: 2019 },
};

// A stand-in for App's real orderChronologically - just returns the keys in
// the order given, so tests can reason about ordering directly.
const identityOrder = (projectsObj) => Object.keys(projectsObj);

const renderFilteredProjects = (props = {}, contextOverrides = {}) => render(
  <MemoryRouter>
    <AppProvider value={{ orderChronologically: identityOrder, closeNav: vi.fn(), ...contextOverrides }}>
      <FilteredProjects projects={projects} {...props} />
    </AppProvider>
  </MemoryRouter>
);

describe('FilteredProjects', () => {
  it('renders every project when there is no active tag selection', () => {
    renderFilteredProjects();
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project B')).toBeInTheDocument();
    expect(screen.getByText('Project C')).toBeInTheDocument();
  });

  it('links each project to its detail page and includes its thumbnail alt text', () => {
    renderFilteredProjects();
    expect(screen.getByRole('link', { name: /Project A/ })).toHaveAttribute('href', '/projects/project-a');
    expect(screen.getByAltText('A thumb')).toBeInTheDocument();
  });

  it('renders nothing but an empty wrapper when no projects match', () => {
    const { container } = renderFilteredProjects({ activeTags: { tools: ['NonexistentTool'] } });
    expect(container.querySelector('.project-list-wrapper')).not.toBeInTheDocument();
    expect(screen.queryByText('Project A')).not.toBeInTheDocument();
  });

  it('AND-filters a category-keyed activeTags object to only projects matching every active category', () => {
    renderFilteredProjects({ activeTags: { tools: ['Squarespace'] }, filterType: 'AND' });
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project C')).toBeInTheDocument();
    expect(screen.queryByText('Project B')).not.toBeInTheDocument();
  });

  it('OR-filters a flat array of tags to any project matching at least one', () => {
    renderFilteredProjects({ activeTags: ['Squarespace'], filterType: 'OR' });
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project C')).toBeInTheDocument();
    expect(screen.queryByText('Project B')).not.toBeInTheDocument();
  });

  it('ranks AND-tier matches before OR-tier matches when filterType is ["AND", "OR"]', () => {
    renderFilteredProjects({
      activeTags: { tools: ['Squarespace'], affiliations: ['Self'] },
      filterType: ['AND', 'OR'],
    });
    // Only project-c matches both categories (AND tier); a and b each match
    // only one category, so they land in the OR tier and rank after it.
    const titles = screen.getAllByRole('heading', { level: 3 }).map(el => el.textContent);
    expect(titles[0]).toBe('Project C');
    expect(titles).toContain('Project A');
    expect(titles).toContain('Project B');
  });

  it('excludes a project from AND-tier-then-OR-tier filtering if it matches neither', () => {
    renderFilteredProjects({
      activeTags: { tools: ['SomeOtherTool'], affiliations: ['SomeOtherClient'] },
      filterType: ['AND', 'OR'],
    });
    expect(screen.queryByText('Project A')).not.toBeInTheDocument();
    expect(screen.queryByText('Project B')).not.toBeInTheDocument();
    expect(screen.queryByText('Project C')).not.toBeInTheDocument();
  });

  it('respects numToDisplay by only rendering that many projects', () => {
    renderFilteredProjects({ numToDisplay: 2 });
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('uses an explicit order array over the default chronological order when given', () => {
    renderFilteredProjects({ order: ['project-b', 'project-a', 'project-c'] });
    const titles = screen.getAllByRole('heading', { level: 3 }).map(el => el.textContent);
    expect(titles).toEqual(['Project B', 'Project A', 'Project C']);
  });
});

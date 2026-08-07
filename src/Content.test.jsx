import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Content from './Content';
import { AppProvider } from './AppContext';

const otherProjects = {
  'other-project': { title: 'Other Project', thumbnail: 'other.png', thumbnail_alt: 'Other thumb', tools: ['Squarespace'], date: 2020 },
};

const renderContent = (props = {}, contextOverrides = {}) => {
  const getProjectData = vi.fn();
  const closeNav = vi.fn();
  const contextValue = {
    getProjectData,
    closeNav,
    projects: otherProjects,
    projectData: {},
    orderChronologically: (projectsObj) => Object.keys(projectsObj),
    ...contextOverrides,
  };
  const rendered = render(
    <MemoryRouter>
      <AppProvider value={contextValue}>
        <Content projectPath="this-project" title="This Project" {...props} />
      </AppProvider>
    </MemoryRouter>
  );
  return { ...rendered, getProjectData, closeNav };
};

describe('Content', () => {
  it('fetches project data for the given projectPath on mount', () => {
    const { getProjectData } = renderContent({ projectPath: 'the-drawing' });
    expect(getProjectData).toHaveBeenCalledWith('the-drawing');
  });

  it('sets document.title to "<title> | Heidi Slojewski"', () => {
    renderContent({ title: "Hi! I'm Heidi" });
    expect(document.title).toBe("Hi! I'm Heidi | Heidi Slojewski");
  });

  it('renders the title as the page heading', () => {
    renderContent({ title: 'My Project' });
    expect(screen.getByRole('heading', { level: 1, name: 'My Project' })).toBeInTheDocument();
  });

  it('renders the description when projectData has one', () => {
    renderContent({}, { projectData: { description: 'A cool project.' } });
    expect(screen.getByText('A cool project.')).toBeInTheDocument();
  });

  it('renders tools, skills, affiliations, and role tags when present', () => {
    renderContent({
      tags: { tools: ['Figma'], skills: ['Wireframing'], affiliations: ['Self'], roles: ['Designer'] },
    });
    expect(screen.getByText('Figma')).toBeInTheDocument();
    expect(screen.getByText('Wireframing')).toBeInTheDocument();
    expect(screen.getByText('Self')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('renders the date when given', () => {
    renderContent({ date: 2022 });
    expect(screen.getByText('2022')).toBeInTheDocument();
  });

  it('shows "Back to Projects" links for project-type pages', () => {
    renderContent({ type: 'project' });
    expect(screen.getAllByRole('link', { name: 'Back to Projects' }).length).toBeGreaterThan(0);
  });

  it('does not show "Back to Projects" links for non-project pages like Home/About', () => {
    renderContent({ type: null });
    expect(screen.queryByText('Back to Projects')).not.toBeInTheDocument();
  });

  it('resolves image and button URLs relative to the configured base path', () => {
    renderContent(
      { type: 'project', projectPath: 'this-project' },
      {
        projectData: {
          content: [
            {
              images: [{ src: 'projects/media/example.png', alt: 'Example screenshot' }],
              buttons: [{ title: 'View PDF', pdf_url: 'projects/media/report.pdf', classes: 'pdf' }],
            },
          ],
        },
      }
    );
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    expect(screen.getByAltText('Example screenshot')).toHaveAttribute('src', `${base}/projects/media/example.png`);
    expect(screen.getByRole('link', { name: 'View PDF' })).toHaveAttribute('href', `${base}/projects/media/report.pdf`);
  });

  it('shows a Related Projects section when another project shares a tag', () => {
    renderContent(
      { type: 'project', tags: { tools: ['Squarespace'], skills: [], affiliations: [], roles: [] } },
      { projects: otherProjects }
    );
    expect(screen.getByText('Related Projects')).toBeInTheDocument();
    expect(screen.getByText('Other Project')).toBeInTheDocument();
  });

  it('hides the Related Projects section when no other project shares a tag', () => {
    renderContent(
      { type: 'project', tags: { tools: ['SomeUnusedTool'], skills: [], affiliations: [], roles: [] } },
      { projects: otherProjects }
    );
    expect(screen.queryByText('Related Projects')).not.toBeInTheDocument();
  });
});

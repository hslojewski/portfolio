import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const projectsList = {
  'sample-project': {
    title: 'Sample Project',
    thumbnail: 'sample.png',
    thumbnail_alt: 'Sample thumb',
    tools: ['Squarespace'],
    skills: [],
    affiliations: [],
    roles: [],
    date: 2022,
  },
};

const sampleProjectData = {
  description: 'A sample project used for testing.',
  content: [],
};

const renderApp = (initialEntries) => render(
  <MemoryRouter initialEntries={initialEntries}>
    <App />
  </MemoryRouter>
);

describe('App', () => {
  beforeEach(() => {
    global.fetch = vi.fn((url) => {
      if (url.includes('projects_list.json')) {
        return Promise.resolve({ json: () => Promise.resolve(projectsList) });
      }
      if (url.includes('sample-project.json')) {
        return Promise.resolve({ json: () => Promise.resolve(sampleProjectData) });
      }
      return Promise.resolve({ json: () => Promise.resolve({}) });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the home page at "/"', async () => {
    renderApp(['/']);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'Heidi Slojewski' })).toBeInTheDocument();
    });
  });

  it('renders the about page at "/about"', async () => {
    renderApp(['/about']);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: "Hi! I'm Heidi" })).toBeInTheDocument();
    });
  });

  it('renders the projects list page at "/projects" once projects have loaded', async () => {
    renderApp(['/projects']);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Sample Project')).toBeInTheDocument();
    });
  });

  it('renders a project detail page once the project route is registered', async () => {
    renderApp(['/projects/sample-project']);
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'Sample Project' })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('A sample project used for testing.')).toBeInTheDocument();
    });
  });

  it('always renders the nav and footer', async () => {
    renderApp(['/']);
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(new RegExp(`${new Date().getFullYear()}.*Heidi Slojewski`))).toBeInTheDocument();
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TagsList from './TagsList';
import { AppProvider } from './AppContext';

const renderTagsList = (contextOverrides = {}) => {
  const updateActiveTagsAndProjects = vi.fn();
  const toggleAccordion = vi.fn();
  const contextValue = {
    tags: { tools: { Squarespace: 3, WordPress: 0 } },
    activeTags: { tools: ['Squarespace'] },
    updateActiveTagsAndProjects,
    toggleAccordion,
    tagAccordions: { tools: false },
    ...contextOverrides,
  };
  const rendered = render(
    <AppProvider value={contextValue}>
      <TagsList title="Tools" />
    </AppProvider>
  );
  return { ...rendered, updateActiveTagsAndProjects, toggleAccordion };
};

describe('TagsList', () => {
  it('lists each tag with its project count', () => {
    renderTagsList();
    expect(screen.getByText('Squarespace (3)')).toBeInTheDocument();
    expect(screen.getByText('WordPress (0)')).toBeInTheDocument();
  });

  it('marks a currently-active tag as active', () => {
    renderTagsList();
    expect(screen.getByText('Squarespace (3)').closest('button')).toHaveClass('active');
    expect(screen.getByText('WordPress (0)').closest('button')).not.toHaveClass('active');
  });

  it('marks a tag with a zero count as disabled', () => {
    renderTagsList();
    expect(screen.getByText('WordPress (0)').closest('button')).toHaveClass('disabled');
    expect(screen.getByText('Squarespace (3)').closest('button')).not.toHaveClass('disabled');
  });

  it('shows how many tags in this category are active, in the tag-count badge', () => {
    const { container } = renderTagsList();
    expect(container.querySelector('.tag-count')).toHaveTextContent('1');
  });

  it('calls updateActiveTagsAndProjects with the category and tag when a tag button is clicked', () => {
    const { updateActiveTagsAndProjects } = renderTagsList();
    fireEvent.click(screen.getByText('WordPress (0)'));
    expect(updateActiveTagsAndProjects).toHaveBeenCalledWith({ title: 'tools', tag: 'WordPress' });
  });

  it('calls toggleAccordion with the lowercased category name when the header is clicked', () => {
    const { toggleAccordion } = renderTagsList();
    fireEvent.click(screen.getByText('Tools'));
    expect(toggleAccordion).toHaveBeenCalledWith('tools');
  });

  it('opens the accordion when tagAccordions marks this category open', () => {
    const { container } = renderTagsList({ tagAccordions: { tools: true } });
    expect(container.querySelector('.tag')).toHaveClass('open');
  });

  it('closes the accordion by default when tagAccordions marks this category closed', () => {
    const { container } = renderTagsList({ tagAccordions: { tools: false } });
    expect(container.querySelector('.tag')).toHaveClass('close');
  });
});

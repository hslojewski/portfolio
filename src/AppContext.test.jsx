import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAppContext, AppProvider } from './AppContext';

describe('AppContext', () => {
  it('throws a helpful error when used outside of an AppProvider', () => {
    expect(() => renderHook(() => useAppContext())).toThrow(
      'useAppContext must be used within an AppProvider'
    );
  });

  it('returns the value passed to the nearest AppProvider', () => {
    const value = { projects: { foo: {} } };
    const { result } = renderHook(() => useAppContext(), {
      wrapper: ({ children }) => <AppProvider value={value}>{children}</AppProvider>,
    });
    expect(result.current).toBe(value);
  });
});

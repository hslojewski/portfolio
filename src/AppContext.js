import { createContext, useContext } from 'react';

// Holds the global, app-wide state (projects, tags, filters, etc.) so it
// doesn't have to be threaded as props through every route and component.
// Route- or instance-specific data (e.g. which project a Content page is
// showing) should still be passed as props.
const AppContext = createContext(null);

export const AppProvider = AppContext.Provider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;

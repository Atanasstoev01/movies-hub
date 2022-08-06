import { createContext } from 'react';

const AppContext = createContext({
  user: null,
  userData: null,
  setContext() {
    // real implementation comes from App.jsx
  },
});

export default AppContext;

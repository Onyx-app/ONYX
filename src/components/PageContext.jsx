import { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [projectTitle, setProjectTitle] = useState(null);

  return (
    <PageContext.Provider value={{ projectTitle, setProjectTitle }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  return useContext(PageContext);
};
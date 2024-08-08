import { createContext, ReactNode, useContext, useState } from 'react';

type User = { name: string } | null;

type SearchContextProps = {
  user: User;
  setUser: (value: User) => void;
} | null;

const SearchContext = createContext<SearchContextProps>(null);

function SearchContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  // @ts-expect-error SET USER PROBLEMs
  return <SearchContext.Provider value={{ user, setUser }}>{children}</SearchContext.Provider>;
}

function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('SearchContext was used outside of SearchContextProvider');
  return context;
}

export { SearchContextProvider, useSearchContext };

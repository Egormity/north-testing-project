import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type UserRepo =
  | {
      id: number;
      name: string;
      language: string;
      updated_at: string;
      stargazers_count: number;
      forks_count: number;
      licence: {
        key: string;
        name: string;
      };
    }
  | null
  | undefined;

type SearchContextProps = {
  userRepos: UserRepo[];
  setUser: (value: UserRepo[]) => void;

  searchUser: string;
  setSearchUser: (value: string) => void;

  activeRepo: UserRepo | null;
  setActiveRepo: (value: UserRepo) => void;

  activePage: number;
  setActivePage: (value: number) => void;

  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;

  isPending: boolean;
  error: null | object;
} | null;

const SearchContext = createContext<SearchContextProps>(null);

function SearchContextProvider({ children }: { children: ReactNode }) {
  const [userRepos, setUserRepos] = useState(null);
  const [searchUser, setSearchUser] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [activeRepo, setActiveRepo] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // useEffect(() => {
  //   if (searchUser) {
  //     setIsPending(true);
  //     fetch(`https://api.github.com/users/${searchUser}/repos`, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer AUTH CODE`,
  //       },
  //     })
  //       .then(res => res.json())
  //       .then(data => setUserRepos(data))
  //       .then(() => setIsPending(false));
  //   }
  // }, [searchUser]);

  useEffect(() => {
    if (searchUser) {
      setIsPending(true);
      fetch(`https://api.github.com/users/${searchUser}/repos`)
        .then(res => res.json())
        .then(data => setUserRepos(data))
        .then(() => setIsPending(false));
    }
  }, [searchUser]);

  return (
    <SearchContext.Provider
      value={{
        // @ts-expect-error SET USER PROBLEM
        userRepos,
        setUserRepos,
        isPending,
        setSearchUser,
        activeRepo,
        // @ts-expect-error SET USER PROBLEM
        setActiveRepo,
        activePage,
        setActivePage,
        itemsPerPage,
        setItemsPerPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('SearchContext was used outside of SearchContextProvider');
  return context;
}

export { SearchContextProvider, useSearchContext };

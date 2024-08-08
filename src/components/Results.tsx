import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

import { UserRepo, useSearchContext } from '../contexts/SearchContext';
import Heading from './Heading';
import Pagination from './Pagination';
import Repo from './Repo';

const sortNames = ['Название', 'Язык', 'Число форков', 'Число зввезд', 'Дата обновления'];

function sortArrayOfObj(paginatedRepos: UserRepo[], sortingDirection: boolean, sortBy: string) {
  let sorted = paginatedRepos;

  // @ts-expect-error THAT'S TOO MUCH
  if (typeof paginatedRepos[0][sortBy] === 'string')
    sorted = paginatedRepos.sort((a, b) => {
      // @ts-expect-error THAT'S TOO MUCH
      if (!a[sortBy] || !b[sortBy]) return -1;
      // @ts-expect-error THAT'S TOO MUCH
      return a[sortBy].localeCompare(b[sortBy]);
    });

  // @ts-expect-error THAT'S TOO MUCH
  if (typeof paginatedRepos[0][sortBy] === 'number')
    sorted = paginatedRepos.sort((a, b) => {
      // @ts-expect-error THAT'S TOO MUCH
      if (!a[sortBy] || !b[sortBy]) return -1;
      // @ts-expect-error THAT'S TOO MUCH
      return a[sortBy] - b[sortBy];
    });

  return sortingDirection ? sorted : sorted.reverse();
}

export default function Results() {
  const { userRepos, itemsPerPage, activePage, setItemsPerPage, setActivePage } = useSearchContext();

  const [activeSorting, setActiveSorting] = useState(sortNames[0]);
  const [sortingDirection, setSortingDirection] = useState(true);

  if (!userRepos) return;

  const from = (activePage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const paginatedRepos = userRepos.slice(from, to);

  const sortedRepost = (() => {
    if (activeSorting === sortNames[0]) return sortArrayOfObj(paginatedRepos, sortingDirection, 'name');
    if (activeSorting === sortNames[1]) return sortArrayOfObj(paginatedRepos, sortingDirection, 'language');
    if (activeSorting === sortNames[2])
      return sortArrayOfObj(paginatedRepos, sortingDirection, 'stargazers_count');
    if (activeSorting === sortNames[3])
      return sortArrayOfObj(paginatedRepos, sortingDirection, 'forks_count');
    if (activeSorting === sortNames[4]) return sortArrayOfObj(paginatedRepos, sortingDirection, 'updated_at');

    return paginatedRepos;
  })();

  return (
    <section className='grid grid-rows-[max-content,max-content] gap-10 p-8 pl-0'>
      <Heading>Результаты поиска</Heading>

      <div className='grid'>
        <div className={`grid grid-cols-5 gap-4 border-b p-2`}>
          {sortNames.map(el => (
            <div
              key={el}
              className='grid cursor-pointer grid-cols-[min-content_1rem] items-center gap-2 overflow-hidden md:grid-cols-[max-content_1rem]'
              onClick={() => {
                if (activeSorting === el) setSortingDirection(dur => !dur);
                else {
                  setActiveSorting(el);
                  setSortingDirection(true);
                }
              }}
            >
              <h2 className='font-bold'>{el}</h2>

              {activeSorting === el && sortingDirection && <FaArrowDown />}
              {activeSorting === el && !sortingDirection && <FaArrowUp />}
            </div>
          ))}
        </div>

        {sortedRepost.map(repo => (!repo ? <p>err</p> : <Repo key={repo.id} repo={repo} />))}
      </div>

      <div className='flex items-end justify-end gap-x-16 gap-y-8 max800px:flex-col'>
        <div className='flex items-center gap-4'>
          <label htmlFor='rowsPerPage'>Rows per page:</label>
          <select
            className='focus:ring-primary border p-2 outline-none duration-primary hover:ring hover:ring-blue-300 focus:ring'
            name='rowsPerPage'
            defaultValue={itemsPerPage}
            onChange={e => {
              setActivePage(1);
              setItemsPerPage(+e.target.value);
            }}
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map(
              el =>
                el >= 5 && (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ),
            )}
          </select>
        </div>

        <Pagination count={userRepos.length} />
      </div>
    </section>
  );
}

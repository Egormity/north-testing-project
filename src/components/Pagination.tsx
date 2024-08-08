import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useSearchContext } from '../contexts/SearchContext';
import Spinner from './Spinner';

export default function Pagination({ count }: { count: number | undefined }) {
  const { itemsPerPage, setActivePage, activePage } = useSearchContext();

  setActivePage;

  if (!count)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Spinner />
      </div>
    );

  const pageCount = Math.ceil(count / itemsPerPage);

  function prevPage() {
    const prev = activePage === 1 ? activePage : activePage - 1;
    setActivePage(prev);
  }

  function nextPage() {
    const next = activePage === pageCount ? activePage : activePage + 1;
    setActivePage(next);
  }

  return (
    <div className='flex items-center justify-end gap-4 max500px:flex-col max500px:items-end'>
      <p>
        Showing {(activePage - 1) * itemsPerPage + 1} &mdash;{' '}
        {activePage === pageCount ? count : activePage * itemsPerPage} of {count} results
      </p>

      <div className='flex items-center gap-6'>
        <button
          disabled={activePage === 1}
          onClick={prevPage}
          className='hover:text-primary text-3xl text-zinc-500 duration-primary'
        >
          <HiChevronLeft />
        </button>

        {pageCount && activePage ? (
          <p>
            {activePage} / {pageCount}
          </p>
        ) : (
          <Spinner />
        )}

        <button
          disabled={activePage === pageCount}
          onClick={nextPage}
          className='hover:text-primary text-3xl text-zinc-500 duration-primary'
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

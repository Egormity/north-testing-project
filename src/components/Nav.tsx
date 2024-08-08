import { useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';

export default function Nav() {
  const { setSearchUser } = useSearchContext();
  const [search, setSearch] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchUser(search);
  }

  return (
    <nav>
      <form
        onSubmit={handleSubmit}
        className={`padding-primary-x bg-primary-dark grid h-[5rem] gap-4 py-4 max600px:grid-cols-[1fr_9rem] min600px:grid-cols-[1fr_9rem_10vw] min1000px:grid-cols-[1fr_9rem_27.5vw]`}
      >
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='rounded-sm px-6 outline-none placeholder:italic hover:ring'
          placeholder='Введите поисковый запрос'
        />

        <button className='bg-primary rounded-sm font-medium text-white shadow-md duration-primary hover:bg-blue-400'>
          ИСКАТЬ
        </button>
      </form>
    </nav>
  );
}

import { MdStar } from 'react-icons/md';

import { useSearchContext } from '../contexts/SearchContext';

export default function RepoInfo() {
  const { activeRepo } = useSearchContext();

  return (
    <section className={`bg-light p-8 min1000px:pl-4`}>
      {!activeRepo ? (
        <div className='flex items-center justify-center'>
          <h5>Выберете репозиторий</h5>
        </div>
      ) : (
        <div className='grid gap-6'>
          <h1 className='text-4xl'>Репо - {activeRepo.name}</h1>
          <div className='flex items-center justify-between'>
            <h3 className={`bg-primary rounded-3xl px-3 py-1.5 text-white`}>
              {activeRepo.language || 'Язык неопределен'}
            </h3>

            <h3 className='flex items-center gap-2'>
              <MdStar className='text-2xl text-yellow-500' />
              <span>{activeRepo.stargazers_count}</span>
            </h3>
          </div>

          <h3>{activeRepo?.licence?.name || <p>Этот репозиторий не имеет лицензии</p>}</h3>
        </div>
      )}
    </section>
  );
}

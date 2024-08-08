import { UserRepo, useSearchContext } from '../contexts/SearchContext';
import { formatDate } from '../utils/formatDate';
import ResultsGrid from './ResultsGrid';

export default function Repo({ repo }: { repo: UserRepo }) {
  const { setActiveRepo } = useSearchContext();

  if (!repo) return <p>no repo</p>;

  return (
    <ResultsGrid
      name={repo.name}
      language={repo.language}
      forkCount={repo.forks_count}
      starCount={repo.stargazers_count}
      updateDate={formatDate(repo.updated_at, 'text')}
      className='cursor-pointer duration-primary hover:bg-zinc-200'
      onClick={() => setActiveRepo(repo)}
    />
  );
}

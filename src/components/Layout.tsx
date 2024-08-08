import { useSearchContext } from '../contexts/SearchContext';
import Heading from './Heading';
import Nav from './Nav';
import RepoInfo from './RepoInfo';
import Results from './Results';
import Spinner from './Spinner';

const mainClassName = 'flex h-[calc(100vh-5rem)] p-8 items-center justify-center';

export default function Layout() {
  const { userRepos, isPending } = useSearchContext();
  console.log(userRepos);

  function whatToShow() {
    if (isPending)
      return (
        <main className={mainClassName}>
          <Spinner />
        </main>
      );

    if (!userRepos)
      return (
        <main className={mainClassName}>
          <Heading>Добро пожаловать</Heading>
        </main>
      );

    // @ts-expect-error there might be
    if (userRepos?.message || userRepos.length === 0)
      return (
        <main className={mainClassName}>
          {' '}
          <Heading>User could not be found. Check the spelling and try again</Heading>
        </main>
      );

    return (
      <main className='padding-primary-l grid min-h-[calc(100vh-5rem)] grid-cols-[2fr_1fr] max1000px:grid-cols-1'>
        <Results />
        <RepoInfo />
      </main>
    );
  }

  return (
    <>
      <Nav />

      {whatToShow()}
    </>
  );
}

import { useSearchContext } from '../contexts/UserContext';
import Nav from './Nav';
import Repos from './Repos';
import Results from './Results';

export default function Layout() {
  const { user } = useSearchContext();

  return (
    <>
      <Nav />

      {!user ? (
        <main className='flex h-[calc(100vh-5rem)] items-center justify-center'>
          <h1 className='text-5xl'>Добро пожаловать</h1>
        </main>
      ) : (
        <main className='grid grid-cols-[2fr_1fr]'>
          <Results />
          <Repos />
        </main>
      )}
    </>
  );
}

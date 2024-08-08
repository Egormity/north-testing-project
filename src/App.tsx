import Layout from './components/Layout';
import { SearchContextProvider } from './contexts/SearchContext';

export default function App() {
  return (
    <SearchContextProvider>
      <Layout />
    </SearchContextProvider>
  );
}

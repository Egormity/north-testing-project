import Layout from './components/Layout';
import { SearchContextProvider } from './contexts/UserContext';

export default function App() {
  return (
    <SearchContextProvider>
      <Layout />
    </SearchContextProvider>
  );
}

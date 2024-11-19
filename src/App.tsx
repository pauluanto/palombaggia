import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import Layout from './components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={isDarkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
              <AppRoutes isDarkMode={isDarkMode} />
            </Layout>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
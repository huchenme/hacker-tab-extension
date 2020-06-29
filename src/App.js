import React from 'react';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import Main from './Main';

const queryConfig = {
  queries: {
    retry: 2,
    staleTime: 5 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },
};

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Main />
      <ReactQueryDevtools
        toggleButtonProps={{
          style: { bottom: 50, right: 10, fontSize: '1rem' },
        }}
      />
    </ReactQueryConfigProvider>
  );
};

export default App;

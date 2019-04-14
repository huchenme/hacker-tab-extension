import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import configureStore from './store';
import GitHub from './components/GitHub/Container';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <UserAgentProvider ua={window.navigator.userAgent}>
        <Container>
          <GitHub />
        </Container>
      </UserAgentProvider>
    </Provider>
  );
}

const Container = styled.div`
  background-color: #eee;
  position: relative;
  padding-top: 56px;
  min-height: 100vh;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from './store';
import GitHub from './components/GitHub';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Container>
        <GitHub />
      </Container>
    </Provider>
  );
}

const Container = styled.div`
  background-color: #eee;
  position: relative;
  padding-top: 56px;
  min-height: 100vh;
`;

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
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
`;

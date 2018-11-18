import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';
import LanguageSelect from './LanguageSelect';

export default function App() {
  return (
    <Provider store={store}>
      <Container>
        <LanguageSelect />
      </Container>
    </Provider>
  );
}

const Container = styled.div`
  margin: 1em;
`;

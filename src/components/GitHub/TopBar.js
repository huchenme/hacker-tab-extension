import React from 'react';
import styled from 'styled-components';
import Selectors from './Selectors';

export default function TopBar() {
  return (
    <Container>
      <Selectors />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Selectors from './Selectors';

export default function TopBar({ isLoading, onRefresh }) {
  return (
    <Container>
      <Selectors />
      {!isLoading ? <Button onClick={onRefresh}>Refresh</Button> : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 16px;
  height: 56px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

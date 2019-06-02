import React from 'react';
import styled from '@emotion/styled';

export default function InfoItem({ children, icon }) {
  return (
    <Container>
      {icon ? <IconContainer>{icon}</IconContainer> : null}
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  margin-right: 3px;
  display: flex;
  align-items: center;
`;

import React from 'react';
import styled from 'styled-components';
import LanguageSelect from './LanguageSelect';
import PeriodSelect from './PeriodSelect';

export default function Selectors() {
  return (
    <Container>
      <SelectWrapper>
        <LanguageSelect />
      </SelectWrapper>
      <SelectWrapper>
        <PeriodSelect />
      </SelectWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const SelectWrapper = styled.div`
  width: 180px;
  margin-right: 16px;
`;

const UpdatedText = styled.div`
  color: #805168;
`;

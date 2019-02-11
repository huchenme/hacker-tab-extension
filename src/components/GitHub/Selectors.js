import React from 'react';
import styled from 'styled-components';
import LanguageSelect from './LanguageSelect';
import PeriodSelect from './PeriodSelect';

function Selectors() {
  return (
    <Container>
      <SelectWrapper>
        <LanguageSelect />
      </SelectWrapper>
      <SelectWrapper width={180}>
        <PeriodSelect />
      </SelectWrapper>
    </Container>
  );
}

export default React.memo(Selectors);

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SelectWrapper = styled.div`
  width: ${props => (props.width ? props.width : 150)}px;
  margin-right: 8px;
`;

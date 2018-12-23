import React from 'react';
import styled from 'styled-components';
import { distanceInWordsToNow, differenceInMinutes } from 'date-fns';
import LanguageSelect from './LanguageSelect';
import PeriodSelect from './PeriodSelect';
import { getLastUpdated, keys } from '../../helpers/localStorage';

export default function Selectors() {
  const lastUpdated = getLastUpdated(keys.REPOSITORIES);
  const lastUpdatedString =
    differenceInMinutes(new Date(), lastUpdated) < 1
      ? 'Just now'
      : distanceInWordsToNow(lastUpdated, {
          addSuffix: true,
        });

  return (
    <Container>
      <SelectWrapper>
        <LanguageSelect />
      </SelectWrapper>
      <SelectWrapper width={180}>
        <PeriodSelect />
      </SelectWrapper>
      {lastUpdated ? (
        <LastUpdated>Last updated: {lastUpdatedString}</LastUpdated>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SelectWrapper = styled.div`
  width: ${props => (props.width ? props.width : 150)}px;
  margin-right: 8px;
`;

const LastUpdated = styled.div`
  margin-left: 16px;
  color: #999;
  font-size: 12px;
`;

/* global chrome */
import React from 'react';
import styled from 'styled-components';
import Button, { ButtonGroup } from '@atlaskit/button';
import { UserAgent } from '@quentin-sommer/react-useragent';
import LanguageSelect from './LanguageSelect';
import PeriodSelect from './PeriodSelect';
import { ReactComponent as ChromeIcon } from '../../images/chrome.svg';
import { getRandomRepositories, getRefUrl } from '../../helpers/github';

const TopBar = ({
  isLoading,
  onChangeLanguage,
  fetchAllLanguages,
  selectedLanguage,
  languages,
  repositories,
  onChangePeriod,
  selectedPeriod,
}) => {
  const randomRepo = getRandomRepositories(repositories);
  return (
    <Container>
      <SelectorsContainer>
        <SelectWrapper>
          <LanguageSelect
            fetchAll={fetchAllLanguages}
            onChange={onChangeLanguage}
            selected={selectedLanguage}
            languages={languages}
          />
        </SelectWrapper>
        <SelectWrapper width={180}>
          <PeriodSelect selected={selectedPeriod} onChange={onChangePeriod} />
        </SelectWrapper>
      </SelectorsContainer>
      <ButtonGroup>
        <UserAgent chrome>
          <Button
            appearance="subtle"
            onClick={() => {
              chrome.tabs.getCurrent(tab => {
                chrome.tabs.update(tab.id, {
                  url: 'chrome-search://local-ntp/local-ntp.html',
                });
              });
            }}
            iconBefore={
              <ChromeIcon height={20} width={20} fill="currentColor" />
            }
          >
            Chrome Tab
          </Button>
        </UserAgent>
        {randomRepo ? (
          <Button
            appearance="primary"
            onClick={() => {
              chrome.tabs.getCurrent(tab => {
                chrome.tabs.update(tab.id, {
                  url: getRefUrl(randomRepo.url),
                });
              });
            }}
          >
            I’m feeling lucky
          </Button>
        ) : null}
      </ButtonGroup>
    </Container>
  );
};

export default React.memo(TopBar);

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

const SelectorsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SelectWrapper = styled.div`
  width: ${props => (props.width ? props.width : 150)}px;
  margin-right: 8px;
`;

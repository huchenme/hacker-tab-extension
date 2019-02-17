/* global chrome */
import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
// import MediaServicesGridIcon from '@atlaskit/icon/glyph/media-services/grid';
import { ReactComponent as ChromeIcon } from '../../images/chrome.svg';
import Selectors from './Selectors';

export default function TopBar({ isLoading, onRefresh }) {
  return (
    <Container>
      <Selectors />
      <Button
        appearance="subtle"
        onClick={() => {
          chrome.tabs.getCurrent(tab => {
            chrome.tabs.update(tab.id, {
              url: 'chrome-search://local-ntp/local-ntp.html',
            });
          });
        }}
        iconBefore={<ChromeIcon height={20} width={20} fill="currentColor" />}
      >
        Chrome Tab
      </Button>
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

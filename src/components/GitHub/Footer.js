import React from 'react';
import styled from 'styled-components';
import { ReactComponent as HeartIcon } from '../../images/heart.svg';

export default function InfoItem({ children, icon }) {
  return (
    <Container>
      <LoveContainer>
        <span>Made with</span>
        <StyledHeartIcon height={16} width={16} fill="#ED2939" />
        <span>in Singapore.</span>
      </LoveContainer>
      <iframe
        title="Github Star"
        src="https://ghbtns.com/github-btn.html?user=huchenme&repo=hacker-tab-extension&type=star"
        frameborder="0"
        scrolling="0"
        width="60px"
        height="20px"
      />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1366px;
  margin: 0 auto;
  padding: 48px 0;
  display: flex;
  justify-content: center;
`;

const LoveContainer = styled.div`
  font-size: 12px;
  color: #aaa;
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

const StyledHeartIcon = styled(HeartIcon)`
  margin: 0 3px;
`;

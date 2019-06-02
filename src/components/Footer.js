import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as HeartIcon } from '../images/heart.svg';

export default function InfoItem({ children, icon }) {
  const [showEmail, setShowEmail] = useState(false);
  return (
    <Container>
      <LoveContainer>
        <span>Made with</span>
        <StyledHeartIcon height={16} width={16} fill="#ED2939" />
        <span>in Singapore.</span>
      </LoveContainer>
      <StyleFeedback
        showEmail={showEmail}
        onClick={() => {
          setShowEmail(true);
        }}
      >
        {showEmail ? 'chen@huchen.dev' : 'Feedback'}
      </StyleFeedback>
      <StyledStar>
        <iframe
          title="Github Star"
          src="https://ghbtns.com/github-btn.html?user=huchenme&repo=hacker-tab-extension&type=star"
          frameBorder="0"
          scrolling="0"
          width="60px"
          height="20px"
        />
      </StyledStar>
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

const StyleFeedback = styled.div`
  color: ${props => (props.showEmail ? '#0052CC' : '#888')};
  margin-right: 24px;
  transition: color 0.3s;
  cursor: ${props => (props.showEmail ? 'auto' : 'pointer')};
  height: 32px;
  line-height: 32px;

  &:hover {
    color: ${props => (props.showEmail ? '#0052CC' : '#555')};
  }
`;

const StyledStar = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
`;

/** @jsx jsx */
import { useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { ReactComponent as HeartIcon } from '../images/heart.svg';

export default function InfoItem({ children, icon }) {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div
      css={css`
        max-width: 1366px;
        margin: 0 auto;
        padding: 48px 0;
      `}
    >
      <Row>
        <div
          css={css`
            font-size: 14px;
            color: #aaa;
            display: flex;
            align-items: center;
          `}
        >
          <span>Made with</span>
          <HeartIcon
            css={css`
              margin: 0 3px;
            `}
            height={16}
            width={16}
            fill="#ED2939"
          />
          <span>in Singapore.</span>
        </div>
      </Row>
      <Row>
        <StyleFeedback showEmail={showEmail} onClick={() => setShowEmail(true)}>
          {showEmail ? 'chen@huchen.dev' : 'Send Feedback'}
        </StyleFeedback>
        <div
          css={link}
          onClick={() => {
            const confirm = window.confirm(
              'Clear cache will clear your selected language and settings.'
            );
            if (confirm) {
              window.localStorage.clear();
            }
          }}
        >
          Clear Cache
        </div>
        <a css={link} href="https://github.com/huchenme/hacker-tab-extension">
          GitHub
        </a>
      </Row>
    </div>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const link = css`
  color: #aaa;
  margin-right: 24px;
  transition: color 0.3s;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;

  &:hover {
    color: #777;
  }

  &:last-child {
    margin: 0;
  }
`;

const StyleFeedback = styled.div`
  ${link};
  color: ${props => (props.showEmail ? '#0052CC' : '#aaa')};
  cursor: ${props => (props.showEmail ? 'auto' : 'pointer')};

  &:hover {
    color: ${props => (props.showEmail ? '#0052CC' : '#777')};
  }
`;

/** @jsx jsx */
import { useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { ReactComponent as HeartIcon } from '../images/heart.svg';

export default function Footer() {
  const [showEmail, setShowEmail] = useState(false);
  const theme = useTheme();

  return (
    <div
      css={css`
        max-width: 1366px;
        margin: 0 auto;
        padding: 48px 0;
        margin-top: 32px;
      `}
    >
      <Row>
        <div
          css={theme => css`
            font-size: 16px;
            color: ${theme.footer.text};
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
            fill={theme.footer.heart}
          />
          <span>in Singapore.</span>
        </div>
      </Row>
      <Row>
        <StyleFeedback showEmail={showEmail} onClick={() => setShowEmail(true)}>
          {showEmail ? 'chen@huchen.dev' : 'Send Feedback'}
        </StyleFeedback>
        <div
          css={theme => css`
            ${link};
            color: ${theme.footer.link};
            &:hover {
              color: ${theme.footer.linkHover};
            }
          `}
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
        <a
          css={theme => css`
            ${link};
            color: ${theme.footer.link};
            &:hover {
              color: ${theme.footer.linkHover};
            }
          `}
          href="https://github.com/huchenme/hacker-tab-extension"
        >
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
  margin-right: 24px;
  transition: color 0.3s;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;

  &:last-child {
    margin: 0;
  }
`;

const StyleFeedback = styled.div`
  ${link};
  color: ${props =>
    props.showEmail ? props.theme.footer.email : props.theme.footer.link};
  cursor: ${props => (props.showEmail ? 'auto' : 'pointer')};

  &:hover {
    color: ${props =>
      props.showEmail
        ? props.theme.footer.email
        : props.theme.footer.linkHover};
  }
`;

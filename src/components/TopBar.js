/** @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import LanguageSelect from './LanguageSelect';
import SpokenLanguageSelect from './SpokenLanguageSelect';
import PeriodSelect from './PeriodSelect';
import { ReactComponent as Logo } from '../images/logo.svg';

const SelectItem = ({ title, children, width }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        margin-right: 24px;
        align-items: center;

        &:last-of-type {
          margin-right: 0;
        }
      `}
    >
      {title && (
        <div
          css={css`
            color: ${theme.select.label};
            margin-right: 16px;
            align-items: center;
          `}
        >
          {title}:
        </div>
      )}
      <div
        css={css`
          width: ${width ? width : 150}px;
        `}
      >
        {children}
      </div>
    </div>
  );
};

const TopBar = ({
  onChangeLanguage,
  selectedLanguage,
  onChangePeriod,
  selectedPeriod,
  onChangeSpokenLanguage,
  selectedSpokenLanguage,
}) => {
  return (
    <Container>
      <div
        data-test-id="top-bar"
        css={css`
          max-width: 1366px;
          display: flex;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <a
          href="https://github.com/huchenme/hacker-tab-extension"
          css={(theme) => css`
            display: block;
            color: ${theme.rgba(0.38)};
            transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);

            &:hover {
              color: ${theme.rgba(1)};
            }
          `}
        >
          <Logo height={40} width={40} fill="currentColor" />
        </a>
        <div
          css={css`
            display: flex;
          `}
        >
          <SelectItem>
            <SpokenLanguageSelect
              selectedValue={selectedSpokenLanguage}
              onChange={onChangeSpokenLanguage}
            />
          </SelectItem>
          <SelectItem>
            <LanguageSelect
              selectedValue={selectedLanguage}
              onChange={onChangeLanguage}
            />
          </SelectItem>
          <SelectItem width={180}>
            <PeriodSelect
              selectedValue={selectedPeriod}
              onChange={onChangePeriod}
            />
          </SelectItem>
        </div>
      </div>
    </Container>
  );
};

TopBar.propTypes = {
  selectedLanguage: PropTypes.string,
  selectedPeriod: PropTypes.string,
  selectedSpokenLanguage: PropTypes.string,
  onChangeLanguage: PropTypes.func.isRequired,
  onChangePeriod: PropTypes.func.isRequired,
  onChangeSpokenLanguage: PropTypes.func.isRequired,
};

export default React.memo(TopBar);

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.theme.topBar.bg};
  padding: 0 16px;
  height: 56px;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  transition: background-color ${(props) => props.theme.transition};
`;

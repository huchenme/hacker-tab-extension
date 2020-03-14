/** @jsx jsx */
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import { ReactComponent as StarFilledIcon } from '../images/star-filled.svg';
import { ReactComponent as BitbucketForksIcon } from '../images/forks.svg';
import { ReactComponent as AuthorIcon } from '../images/author.svg';

import Icon from './Icon';
import InfoItem from './InfoItem';

import { getRefUrl, getAvatarString } from '../helpers/github';

const RepositoryCard = ({
  stars = 0,
  forks = 0,
  currentPeriodStars = 0,
  url,
  avatar,
  name,
  author,
  description,
  language,
  languageColor,
}) => {
  const theme = useTheme();

  return (
    <Card data-test-id="repo-card" href={getRefUrl(url)}>
      <Left>
        <Avatar src={getAvatarString(avatar, 160)} />
      </Left>
      <Middle>
        <h3
          css={css`
            margin: 0;
            font-size: 18px;
            line-height: 24px;
            font-weight: 300;
            color: ${theme.text.active};
            transition: color ${theme.transition};
          `}
        >
          <AuthorIcon
            css={css`
              fill: ${theme.text.helper};
              margin-right: 8px;
              position: relative;
              top: 3px;
            `}
          />
          <span
            data-test-id="author"
            css={css`
              font-size: 0.9em;
            `}
          >
            {author}
          </span>
          <span
            css={css`
              margin: 0 5px;
            `}
          >
            /
          </span>
          <span
            data-test-id="name"
            css={css`
              font-weight: 600;
            `}
          >
            {name}
          </span>
        </h3>
        <Description>{description}</Description>
        <AdditionalInfo>
          <AdditionalInfoSection>
            {language ? (
              <AdditionalInfoItem>
                <InfoItem icon={<LanguageColor color={languageColor} />}>
                  {language}
                </InfoItem>
              </AdditionalInfoItem>
            ) : null}
            <AdditionalInfoItem>
              <InfoItem icon={<Icon glyph={StarFilledIcon} />}>
                {stars.toLocaleString()}
              </InfoItem>
            </AdditionalInfoItem>
            <AdditionalInfoItem>
              <InfoItem icon={<Icon glyph={BitbucketForksIcon} />}>
                {forks.toLocaleString()}
              </InfoItem>
            </AdditionalInfoItem>
          </AdditionalInfoSection>
        </AdditionalInfo>
      </Middle>
      <Right>
        <CurrentStar>{currentPeriodStars.toLocaleString()}</CurrentStar>
      </Right>
    </Card>
  );
};

RepositoryCard.propTypes = {
  author: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  avatar: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string,
  languageCode: PropTypes.string,
  stars: PropTypes.number,
  forks: PropTypes.number,
  currentPeriodStars: PropTypes.number,
};

RepositoryCard.defaultProps = {
  languageCode: '#586069',
  stars: 0,
  forks: 0,
  currentPeriodStars: 0,
};

export default RepositoryCard;

const Card = styled.a`
  position: relative;
  width: 720px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  transition: background-color ${props => props.theme.transition};

  &,
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: initial;
  }

  &:hover {
    background-color: ${props => props.theme.card.bgHover};
  }
`;

const Left = styled.div`
  margin-right: 20px;
`;

const Middle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 2px;
  overflow: hidden;
  border: 0;
  vertical-align: bottom;
`;

const Description = styled.div`
  margin-top: 5px;
  flex-grow: 1;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: ${props => props.theme.text.helper};
  transition: color ${props => props.theme.transition};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  box-sizing: border-box;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  flex: 1;
`;

const AdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.card.additional};
  transition: color ${props => props.theme.transition};
  font-size: 12px;
  margin-top: 14px;
  justify-content: space-between;
`;

const AdditionalInfoSection = styled.div`
  display: flex;
  align-items: center;
`;

const AdditionalInfoItem = styled.div`
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`;

const LanguageColor = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${props => props.color || props.theme.card.additional};
`;

const CurrentStar = styled.div`
  position: relative;
  left: -4px;
  top: 4px;
  font-size: 40px;
  line-height: 1;
  color: ${props => props.theme.card.currentStar};
  transition: color ${props => props.theme.transition};
  font-weight: 100;
  font-family: 'Futura PT';
`;

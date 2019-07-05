import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { ReactComponent as StarFilledIcon } from '../images/star-filled.svg';
import { ReactComponent as BitbucketForksIcon } from '../images/forks.svg';
import { ReactComponent as BitbucketReposIcon } from '../images/repos.svg';

import Icon from './Icon';
import InfoItem from './InfoItem';

import { getRefUrl, getAvatarString } from '../helpers/github';

const RepositoryCard = props => (
  <Card href={getRefUrl(props.url)}>
    <Left>
      <Avatar src={getAvatarString(props.avatar, 160)} />
    </Left>
    <Middle>
      <Title>{props.name}</Title>
      <Description>{props.description}</Description>
      <AdditionalInfo>
        <AdditionalInfoSection>
          <AdditionalInfoItem>
            <InfoItem icon={<Icon glyph={BitbucketReposIcon} />}>
              {props.author}
            </InfoItem>
          </AdditionalInfoItem>
          {props.language ? (
            <AdditionalInfoItem>
              <InfoItem icon={<LanguageColor color={props.languageColor} />}>
                {props.language}
              </InfoItem>
            </AdditionalInfoItem>
          ) : null}
          <AdditionalInfoItem>
            <InfoItem icon={<Icon glyph={StarFilledIcon} />}>
              {props.stars.toLocaleString()}
            </InfoItem>
          </AdditionalInfoItem>
          <AdditionalInfoItem>
            <InfoItem icon={<Icon glyph={BitbucketForksIcon} />}>
              {props.forks.toLocaleString()}
            </InfoItem>
          </AdditionalInfoItem>
        </AdditionalInfoSection>
      </AdditionalInfo>
    </Middle>
    <Right>
      <CurrentStar>{props.currentPeriodStars}</CurrentStar>
    </Right>
  </Card>
);

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
  transition: background-color 0.2s;

  &,
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: initial;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
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
  height: 80px;
  width: 80px;
  border-radius: 5px;
  overflow: hidden;
  border: 0;
  vertical-align: bottom;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
`;

const Description = styled.div`
  flex-grow: 1;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
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
  color: #586069;
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
  background-color: ${props => props.color || '#586069'};
`;

const CurrentStar = styled.div`
  position: relative;
  left: -4px;
  top: 4px;
  font-size: 40px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.38);
  font-weight: 100;
  font-family: 'Futura PT';
`;

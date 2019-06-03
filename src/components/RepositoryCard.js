import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ellipsis } from 'polished';
import Linkify from 'react-linkify';
import Paper from '@material-ui/core/Paper';

import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import BitbucketForksIcon from '@atlaskit/icon/glyph/bitbucket/forks';
import PersonIcon from '@atlaskit/icon/glyph/people';
import Avatar from '@atlaskit/avatar';

import InfoItem from './InfoItem';

import { getRefUrl } from '../helpers/github';

function getAvatarString(src) {
  if (!src) {
    return src;
  }
  return `${src}?s=50`;
}

const RepositoryCard = props => (
  <Card>
    <CurrentStar>{props.currentPeriodStars}</CurrentStar>
    <Title>
      {props.url ? (
        <a href={getRefUrl(props.url)}>
          <Author>{props.author}</Author> / {props.name}
        </a>
      ) : (
        <span>
          <Author>{props.author}</Author> / {props.name}
        </span>
      )}
    </Title>
    <Description>
      <Linkify>{props.description}</Linkify>
    </Description>
    <AdditionalInfo>
      <AdditionalInfoSection>
        {props.language ? (
          <AdditionalInfoItem>
            <InfoItem icon={<LanguageColor color={props.languageColor} />}>
              {props.language}
            </InfoItem>
          </AdditionalInfoItem>
        ) : null}
        <AdditionalInfoItem>
          <InfoItem icon={<StarFilledIcon label="Stars" size="small" />}>
            {props.stars.toLocaleString()}
          </InfoItem>
        </AdditionalInfoItem>
        <AdditionalInfoItem>
          <InfoItem icon={<BitbucketForksIcon label="Forks" size="small" />}>
            {props.forks.toLocaleString()}
          </InfoItem>
        </AdditionalInfoItem>
        {props.builtBy.length > 0 ? (
          <AdditionalInfoItem>
            <InfoItem icon={<PersonIcon label="Built by" size="small" />}>
              {props.builtBy.map(person => (
                <Avatar
                  key={person.username}
                  name={person.username}
                  size="xsmall"
                  href={person.href}
                  src={getAvatarString(person.avatar)}
                />
              ))}
            </InfoItem>
          </AdditionalInfoItem>
        ) : null}
      </AdditionalInfoSection>
    </AdditionalInfo>
  </Card>
);

RepositoryCard.propTypes = {
  author: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string,
  languageCode: PropTypes.string,
  stars: PropTypes.number,
  forks: PropTypes.number,
  currentPeriodStars: PropTypes.number,
  builtBy: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      href: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
  period: PropTypes.oneOf(['daily', 'weekly', 'monthly']),
};

RepositoryCard.defaultProps = {
  languageCode: '#586069',
  period: 'daily',
  builtBy: [],
};

export default RepositoryCard;

const Card = styled(Paper)`
  position: relative;
  padding: 24px;
  padding-bottom: 16px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 675px;
  margin: auto;
`;

const Title = styled.h3`
  margin-bottom: 8px;
  margin-top: 0;
  padding-right: 100px;
  box-sizing: border-box;
  ${ellipsis()};
`;

const Author = styled.span`
  font-weight: 400;
`;

const Description = styled.div`
  margin: 4px 0 24px;
  padding-right: 100px;
  color: #555;
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
  margin-top: 8px;
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
  position: absolute;
  right: 16px;
  bottom: 8px;
  font-size: 56px;
  line-height: 1;
  color: #ddd;
  letter-spacing: -0.05em;
  font-weight: 100;
  font-style: italic;
  font-family: 'Futura PT';
`;

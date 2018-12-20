import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ellipsis } from 'polished';
import { get } from 'lodash';
import Linkify from 'react-linkify';

import StarFilledIcon from '@atlaskit/icon/glyph/star-filled';
import BitbucketForksIcon from '@atlaskit/icon/glyph/bitbucket/forks';
import PersonIcon from '@atlaskit/icon/glyph/people';
import Avatar from '@atlaskit/avatar';
import { findPeriod } from '../../helpers/github';

import InfoItem from './InfoItem';

const RepositoryCard = props => {
  const periodString = get(findPeriod(props.period), 'label', '');
  return (
    <Card>
      <div>
        <Title>
          <a href={props.url}>
            <Author>{props.author}</Author> / {props.name}
          </a>
        </Title>
      </div>
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
                  <StyledAvatar
                    key={person.username}
                    name={person.username}
                    size="xsmall"
                    href={person.href}
                    src={person.avatar}
                  />
                ))}
              </InfoItem>
            </AdditionalInfoItem>
          ) : null}
        </AdditionalInfoSection>
        <AdditionalInfoSection>
          <AdditionalInfoItem>
            <InfoItem icon={<StarFilledIcon label="Stars" size="small" />}>
              {`${props.currentPeriodStars.toLocaleString()} stars ${periodString}`.trim()}
            </InfoItem>
          </AdditionalInfoItem>
        </AdditionalInfoSection>
      </AdditionalInfo>
    </Card>
  );
};

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

const Card = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #e1e4e8;
  margin-right: 8px;

  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.h3`
  margin-bottom: 8px;
  padding-right: 100px;
  box-sizing: border-box;
  ${ellipsis()};
`;

const Author = styled.span`
  font-weight: 400;
`;

const Description = styled.div`
  margin: 4px 0;
  padding-right: 100px;
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

const StyledAvatar = styled(Avatar)`
  width: 20px;
  height: 20px;
`;

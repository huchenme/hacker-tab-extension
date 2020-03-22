/** @jsx jsx */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

import RepositoryCard from './RepositoryCard';
import ContentPlaceholder from './ContentPlaceholder';
import LastUpdated from './LastUpdated';
import { ReactComponent as RandomIcon } from '../images/random.svg';

import { getRandomRepositories } from '../helpers/github';

const RepositoriesList = ({
  repositories,
  isLoading,
  lastUpdatedTime,
  onReload,
}) => {
  const [random, setRandom] = useState(() =>
    getRandomRepositories(repositories)
  );

  useEffect(() => {
    setRandom(getRandomRepositories(repositories));
  }, [repositories]);

  const transitions = useTransition(random, item => (item ? item.url : null), {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { position: 'absolute', opacity: 0 },
  });

  return (
    <Container>
      {random ? (
        <div
          css={css`
            margin-bottom: 72px;
          `}
        >
          <Title isLoading={isLoading}>I’m Feeling Lucky</Title>
          <div
            data-test-id="random-repo-list"
            css={css`
              position: relative;
            `}
          >
            {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <List
                  css={css`
                    min-height: auto;
                  `}
                >
                  <Card>
                    <RepositoryCard {...item} />
                  </Card>
                </List>
              </animated.div>
            ))}
            <div
              aria-label="Random Pick Button"
              css={theme => css`
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(calc(100% + 10px), -50%);
                cursor: pointer;
                color: ${theme.icon.color};
                transition: color ${theme.transition};
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                  color: ${theme.icon.hoverColor};
                }
              `}
              onClick={() => {
                setRandom(getRandomRepositories(repositories, random));
              }}
            >
              <RandomIcon
                css={css`
                  fill: currentColor;
                `}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <Title isLoading={isLoading}>Trending Repositories</Title>
        {isLoading ? (
          <ContentPlaceholder size={10} />
        ) : (
          <List data-test-id="loaded-repo-list">
            {repositories.map(rep => (
              <Card key={rep.url}>
                <RepositoryCard {...rep} />
              </Card>
            ))}
          </List>
        )}
      </div>
      {!isLoading ? (
        <LastUpdated
          css={css`
            margin-top: 24px;
          `}
          lastUpdatedTime={lastUpdatedTime}
          onReload={onReload}
        />
      ) : null}
    </Container>
  );
};

RepositoriesList.propTypes = {
  repositories: PropTypes.array,
  isLoading: PropTypes.bool,
  lastUpdatedTime: PropTypes.number,
  onReload: PropTypes.func,
};

RepositoriesList.defaultProps = {
  repositories: [],
  isLoading: false,
};

export default RepositoriesList;

const Container = styled.div`
  margin: 0 auto;
  margin-top: 56px;
  width: 720px;
`;

const Title = styled.h1`
  text-align: center;
  font-family: 'TT Commons', sans-serif;
  margin-bottom: 16px;
  font-size: 24px;
  line-height: 1.1;
  transition: color 0.2s ease-in-out;
  color: rgba(
    ${props => (props.theme.isDark ? '255,255,255' : '0,0,0')},
    ${props => (props.isLoading ? '0.38' : '0.87')}
  );
`;

const List = styled.div`
  background-color: ${props => props.theme.card.bg};
  transition: background-color ${props => props.theme.transition};
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  min-height: 120px;
  border: 1px solid ${props => props.theme.card.border};
`;

const Card = styled.div`
  border-bottom: 1px solid ${props => props.theme.card.divider};
  transition: border-color ${props => props.theme.transition};
  overflow: hidden;
  :last-of-type {
    border-bottom: 0;
  }
`;

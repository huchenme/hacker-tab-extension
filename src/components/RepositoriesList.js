/** @jsx jsx */
import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

import RepositoryCard from './RepositoryCard';
import ContentPlaceholder from './ContentPlaceholder';
import { ReactComponent as RandomIcon } from '../images/random.svg';

import { getRandomRepositories } from '../helpers/github';

const RepositoriesList = ({ repositories, isLoading }) => {
  const [random, setRandom] = useState(() =>
    getRandomRepositories(repositories)
  );

  const changeRandom = useCallback(() => {
    const newRandom = getRandomRepositories(repositories);
    setRandom(newRandom);
  }, [repositories]);

  useEffect(() => {
    changeRandom();
  }, [changeRandom]);

  const transitions = useTransition(random, item => (item ? item.url : null), {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { position: 'absolute', opacity: 0 },
  });

  return (
    <Container>
      {random ? (
        <Section>
          <Title isLoading={isLoading}>I’m Feeling Lucky</Title>
          <div
            css={css`
              position: relative;
            `}
          >
            {transitions.map(({ item, props, key }) => (
              <animated.div key={key} style={props}>
                <List>
                  <Card>
                    <RepositoryCard {...item} />
                  </Card>
                </List>
              </animated.div>
            ))}
            <RandomIcon
              css={css`
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(calc(100% + 20px), -50%);
                cursor: pointer;
                fill: #aaa;
                transition: fill 0.3s;

                &:hover {
                  fill: #777;
                }
              `}
              onClick={changeRandom}
            />
          </div>
        </Section>
      ) : null}
      <Section>
        <Title isLoading={isLoading}>Trending Repositories</Title>
        {isLoading ? (
          <ContentPlaceholder size={10} />
        ) : (
          <List>
            {repositories.map(rep => (
              <Card key={rep.url}>
                <RepositoryCard {...rep} />
              </Card>
            ))}
          </List>
        )}
      </Section>
    </Container>
  );
};

RepositoriesList.propTypes = {
  repositories: PropTypes.array,
  isLoading: PropTypes.bool,
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

const Section = styled.div`
  margin-bottom: 72px;
  :last-of-type {
    margin-bottom: 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  line-height: 1.4;
  font-weight: 600;
  font-family: 'Futura PT';
  margin-bottom: 16px;
  font-size: 20px;
  transition: color 0.2s ease-in-out;
  color: rgba(0, 0, 0, ${props => (props.isLoading ? '0.32' : '0.87')});
`;

const List = styled.div`
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  min-height: 120px;
`;

const Card = styled.div`
  border-bottom: 1px solid #e8e8e8;
  overflow: hidden;
  :last-of-type {
    border-bottom: 0;
  }
`;

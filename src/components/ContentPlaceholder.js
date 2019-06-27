/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { linearGradient } from 'polished';

const placeHolderShimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const placeholderStyle = css`
  display: inline-block;
  border-radius: 5px;
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${placeHolderShimmer};
  animation-timing-function: linear;
  background-size: 800px 104px;
  height: inherit;
  position: relative;
  ${linearGradient({
    colorStops: [
      'rgba(0,0,0,0.03) 8%',
      'rgba(0,0,0,0.07) 18%',
      'rgba(0,0,0,0.03) 33%',
    ],
    toDirection: 'to right',
    fallback: '#f6f7f8',
  })}
`;

const Placeholder = props => (
  <div
    css={css`
      ${placeholderStyle};
      width: 100%;
      display: inline-block;
    `}
    {...props}
  >
    &nbsp;
  </div>
);

const PlaceholderCard = props => (
  <Card>
    <Left>
      <Placeholder
        css={css`
          height: 80px;
          width: 80px;
          border-radius: 5px;
          overflow: hidden;
          display: block;
        `}
      />
    </Left>
    <Middle>
      <Title>
        <Placeholder
          css={css`
            width: 150px;
          `}
        />
      </Title>
      <Description>
        <Placeholder />
      </Description>
      <AdditionalInfo>
        <AdditionalInfoItem>
          <Placeholder
            css={css`
              width: 80px;
            `}
          />
        </AdditionalInfoItem>
        <AdditionalInfoItem>
          <Placeholder
            css={css`
              width: 80px;
            `}
          />
        </AdditionalInfoItem>
        <AdditionalInfoItem>
          <Placeholder
            css={css`
              width: 80px;
            `}
          />
        </AdditionalInfoItem>
      </AdditionalInfo>
    </Middle>
    <Right>
      <CurrentStar>
        <Placeholder
          css={css`
            width: 50px;
          `}
        />
      </CurrentStar>
    </Right>
  </Card>
);

const ContentPlaceholder = ({ size = 1 }) => {
  return (
    <div
      css={css`
        background: white;
        border-radius: 5px;
        overflow: hidden;
        border: 1px solid #e8e8e8;
      `}
    >
      {Array(size)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            css={css`
              border-bottom: 1px solid #e8e8e8;
              overflow: hidden;

              :last-of-type {
                border-bottom: 0;
              }
            `}
          >
            <PlaceholderCard />
          </div>
        ))}
    </div>
  );
};

export default ContentPlaceholder;

const Card = styled.div`
  width: 720px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  user-select: none;
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

const Title = styled.h3`
  margin-bottom: 8px;
  line-height: 24px;
`;

const Description = styled.div`
  flex-grow: 1;
  line-height: 20px;
  flex: 1;
`;

const AdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const AdditionalInfoItem = styled.div`
  margin-right: 16px;
`;

const CurrentStar = styled.div`
  font-size: 48px;
  line-height: 1;
`;

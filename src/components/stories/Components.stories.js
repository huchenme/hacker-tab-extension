/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EmptyState, Footer, ContentPlaceholder } from '..';

storiesOf('EmptyState', module).add('default', () => <EmptyState />);

storiesOf('Footer', module).add('default', () => <Footer />);

storiesOf('ContentPlaceholder', module)
  .add('size 1', () => <ContentPlaceholder />)
  .add('size 10', () => <ContentPlaceholder size={10} />);

export const redBox = css`
  padding: 10px;
  background: white;
  border: 2px solid red;
  display: inline-block;
`;

import React from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EmptyState, Footer, ClickAwayListener } from '..';

storiesOf('ClickAwayListener', module).add('default', () => (
  <ClickAwayListener onClickAway={action('clicked outside')}>
    <div
      css={css`
        padding: 10px;
        border: 2px solid red;
        display: inline-block;
      `}
    >
      Click outside this block
    </div>
  </ClickAwayListener>
));

storiesOf('EmptyState', module).add('default', () => <EmptyState />);

storiesOf('Footer', module).add('default', () => <Footer />);

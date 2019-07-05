/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import NetworkError from '../NetworkError';

storiesOf('NetworkError', module).add('basic usage', () => (
  <div
    css={css`
      width: 720px;
      box-sizing: border-box;
    `}
  >
    <NetworkError onClose={action('close')} onReload={action('reload')} />
  </div>
));

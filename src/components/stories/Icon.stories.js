/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';

import Icon from '../Icon';

import { ReactComponent as StarFilledIcon } from '../../images/star-filled.svg';

storiesOf('Icon', module)
  .add('basic usage', () => <Icon glyph={StarFilledIcon} />)
  .add('change color', () => (
    <div>
      <Icon glyph={StarFilledIcon} primaryColor="red" />
    </div>
  ))
  .add('size small', () => (
    <div>
      <Icon glyph={StarFilledIcon} size="small" />
      <Icon glyph={StarFilledIcon} size="medium" />
      <Icon glyph={StarFilledIcon} size="large" />
      <Icon glyph={StarFilledIcon} size="xlarge" />
    </div>
  ));

import React from 'react';

import { storiesOf } from '@storybook/react';

import { EmptyState, Footer } from '..';

storiesOf('EmptyState', module).add('default', () => <EmptyState />);

storiesOf('Footer', module).add('default', () => <Footer />);

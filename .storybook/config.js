import { configure, addDecorator } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

import '../src/global.css';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(centered);

configure(loadStories, module);

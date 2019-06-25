/** @jsx jsx */
import { useState } from 'react';
import { css, jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  EmptyState,
  Footer,
  ClickAwayListener,
  Popup,
  ContentPlaceholder,
} from '..';

import popupNotes from './Popup.md';

storiesOf('ClickAwayListener', module).add('default', () => (
  <ClickAwayListener onClickAway={action('clicked outside')}>
    <div css={redBox}>Click outside this block</div>
  </ClickAwayListener>
));

storiesOf('EmptyState', module).add('default', () => <EmptyState />);

storiesOf('Footer', module).add('default', () => <Footer />);

storiesOf('Popup', module)
  .add('basic usage', () => (
    <Popup
      content={({ placement, close }) => (
        <div
          css={css`
            ${redBox};
            margin-top: 10px;
          `}
        >
          Popup Content
          <button onClick={close}>Close</button>
        </div>
      )}
    >
      {({ ref, toggle, isOpen }) => (
        <button ref={ref} onClick={toggle}>
          Currently {isOpen ? 'open' : 'closed'}
        </button>
      )}
    </Popup>
  ))
  .add('controlled component', () => {
    const ControlledComponent = props => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <Popup
          isOpen={isOpen}
          onToggle={setIsOpen}
          onOutsideClick={() => setIsOpen(false)}
          content={({ placement, close }) => (
            <div
              css={css`
                ${redBox};
                margin-top: 10px;
              `}
            >
              Popup Content
              <button onClick={close}>Close</button>
            </div>
          )}
        >
          {({ ref, toggle, isOpen }) => (
            <button ref={ref} onClick={toggle}>
              Currently {isOpen ? 'open' : 'closed'}
            </button>
          )}
        </Popup>
      );
    };
    return <ControlledComponent />;
  })
  .add(
    'popup placement',
    () => (
      <Popup
        placement="right"
        content={({ placement, close }) => (
          <div
            css={css`
              ${redBox};
              margin-left: 10px;
            `}
          >
            Popup Content
          </div>
        )}
      >
        {({ ref, toggle, isOpen }) => (
          <button ref={ref} onClick={toggle}>
            Currently {isOpen ? 'open' : 'closed'}
          </button>
        )}
      </Popup>
    ),
    {
      notes: { markdown: popupNotes },
    }
  );

storiesOf('ContentPlaceholder', module)
  .add('size 1', () => <ContentPlaceholder />)
  .add('size 10', () => <ContentPlaceholder size={10} />);

export const redBox = css`
  padding: 10px;
  background: white;
  border: 2px solid red;
  display: inline-block;
`;

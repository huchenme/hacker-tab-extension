import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ClickAwayListener from '../ClickAwayListener';

const setup = props => {
  const utils = render(
    <div>
      <div>Outside</div>
      <ClickAwayListener {...props}>
        <div>Inside</div>
      </ClickAwayListener>
    </div>
  );
  const outside = utils.getByText('Outside');
  const inside = utils.getByText('Inside');
  return {
    outside,
    inside,
    ...utils,
  };
};

describe('<ClickAwayListener />', () => {
  it('should render the children', () => {
    const { queryByText } = setup();
    expect(queryByText('Outside')).toBeInTheDocument();
    expect(queryByText('Inside')).toBeInTheDocument();
  });

  describe('prop: onClickAway', () => {
    it('should be call when clicking away', () => {
      const handleClickAway = jest.fn();
      const { outside } = setup({ onClickAway: handleClickAway });

      fireEvent.mouseUp(outside);
      expect(handleClickAway).toHaveBeenCalled();
    });

    it('should not be call when clicking inside', () => {
      const handleClickAway = jest.fn();
      const { inside } = setup({ onClickAway: handleClickAway });

      fireEvent.mouseUp(inside);
      expect(handleClickAway).not.toHaveBeenCalled();
    });
  });

  describe('prop: mouseEvent', () => {
    it('should not call `props.onClickAway` when `props.mouseEvent` is `false`', () => {
      const handleClickAway = jest.fn();
      const { outside } = setup({
        onClickAway: handleClickAway,
        mouseEvent: false,
      });

      fireEvent.mouseUp(outside);
      expect(handleClickAway).not.toHaveBeenCalled();
    });

    it('should call `props.onClickAway` when the appropriate mouse event is triggered', () => {
      const handleClickAway = jest.fn();
      const { outside } = setup({
        onClickAway: handleClickAway,
        mouseEvent: 'onMouseDown',
      });

      fireEvent.mouseUp(outside);
      expect(handleClickAway).not.toHaveBeenCalled();

      fireEvent.mouseDown(outside);
      expect(handleClickAway).toHaveBeenCalled();
    });
  });
});

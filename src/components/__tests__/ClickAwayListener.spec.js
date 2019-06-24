import ReactDOM from 'react-dom';
import ClickAwayListener from './ClickAwayListener';

function fireBodyMouseEvent(name, properties = {}) {
  const event = document.createEvent('MouseEvents');
  event.initEvent(name, true, true);
  Object.keys(properties).forEach(key => {
    event[key] = properties[key];
  });
  document.body.dispatchEvent(event);
  return event;
}

describe('<ClickAwayListener />', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the children', () => {
    const children = <span>Hello</span>;
    wrapper = mount(
      <ClickAwayListener onClickAway={() => {}}>{children}</ClickAwayListener>
    );
    expect(wrapper.contains(children)).toBeTruthy();
  });

  describe('prop: onClickAway', () => {
    it('should be call when clicking away', () => {
      const handleClickAway = jest.fn();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>
      );

      const event = fireBodyMouseEvent('mouseup');

      expect(handleClickAway).toHaveBeenCalledTimes(1);
      expect(handleClickAway).toHaveBeenLastCalledWith(event);
    });

    it('should not be call when clicking inside', () => {
      const handleClickAway = jest.fn();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>
      );

      const event = new window.Event('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      const el = ReactDOM.findDOMNode(wrapper.instance());
      if (el) {
        el.dispatchEvent(event);
      }

      expect(handleClickAway).not.toHaveBeenCalled();
    });

    it('should not be call when defaultPrevented', () => {
      const handleClickAway = jest.fn();
      wrapper = mount(
        <ClickAwayListener onClickAway={handleClickAway}>
          <ClickAwayListener onClickAway={event => event.preventDefault()}>
            <span>Hello</span>
          </ClickAwayListener>
        </ClickAwayListener>
      );

      const event = new window.Event('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      window.document.body.dispatchEvent(event);
      expect(handleClickAway).not.toHaveBeenCalled();
    });
  });

  describe('prop: mouseEvent', () => {
    it('should not call `props.onClickAway` when `props.mouseEvent` is `false`', () => {
      const handleClickAway = jest.fn();
      wrapper = mount(
        <ClickAwayListener mouseEvent={false} onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>
      );
      fireBodyMouseEvent('mouseup');
      expect(handleClickAway).not.toHaveBeenCalled();
    });

    it('should call `props.onClickAway` when the appropriate mouse event is triggered', () => {
      const handleClickAway = jest.fn();
      wrapper = mount(
        <ClickAwayListener
          mouseEvent="onMouseDown"
          onClickAway={handleClickAway}
        >
          <span>Hello</span>
        </ClickAwayListener>
      );
      fireBodyMouseEvent('mouseup');
      expect(handleClickAway).not.toHaveBeenCalled();
      const mouseDownEvent = fireBodyMouseEvent('mousedown');
      expect(handleClickAway).toHaveBeenCalledTimes(1);
      expect(handleClickAway).toHaveBeenCalledWith(mouseDownEvent);
    });
  });

  describe('prop: touchEvent', () => {
    it('should not call `props.onClickAway` when `props.touchEvent` is `false`', () => {
      const handleClickAway = jest.fn();
      wrapper = mount(
        <ClickAwayListener touchEvent={false} onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>
      );
      fireBodyMouseEvent('touchend');
      expect(handleClickAway).not.toHaveBeenCalled();
    });

    it('should call `props.onClickAway` when the appropriate touch event is triggered', () => {
      const handleClickAway = jest.fn();
      wrapper = mount(
        <ClickAwayListener
          touchEvent="onTouchStart"
          onClickAway={handleClickAway}
        >
          <span>Hello</span>
        </ClickAwayListener>
      );
      fireBodyMouseEvent('touchend');
      expect(handleClickAway).not.toHaveBeenCalled();
      const touchStartEvent = fireBodyMouseEvent('touchstart');
      expect(handleClickAway).toHaveBeenCalledTimes(1);
      expect(handleClickAway).toHaveBeenCalledWith(touchStartEvent);
    });

    it('should ignore `touchend` when preceeded by `touchmove` event', () => {
      const handleClickAway = jest.fn();
      wrapper = mount(
        <ClickAwayListener
          touchEvent="onTouchEnd"
          onClickAway={handleClickAway}
        >
          <span>Hello</span>
        </ClickAwayListener>
      );
      fireBodyMouseEvent('touchstart');
      fireBodyMouseEvent('touchmove');
      fireBodyMouseEvent('touchend');
      expect(handleClickAway).not.toHaveBeenCalled();

      const touchEndEvent = fireBodyMouseEvent('touchend');
      expect(handleClickAway).toHaveBeenCalledTimes(1);
      expect(handleClickAway).toHaveBeenCalledWith(touchEndEvent);
    });
  });
});

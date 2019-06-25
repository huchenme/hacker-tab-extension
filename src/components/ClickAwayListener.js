import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';

function ownerDocument(node) {
  return (node && node.ownerDocument) || /* istanbul ignore next */ document;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 * https://material-ui.com/utils/click-away-listener/
 */
class ClickAwayListener extends React.Component {
  state = { moved: false };

  componentDidMount() {
    // Finds the first child when a component returns a fragment.
    // https://github.com/facebook/react/blob/036ae3c6e2f056adffc31dfb78d1b6f0c63272f0/packages/react-dom/src/__tests__/ReactDOMFiber-test.js#L105
    // eslint-disable-next-line react/no-find-dom-node
    this.node = ReactDOM.findDOMNode(this);
  }

  handleClickAway = event => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // Do not act if user performed touchmove
    if (this.state.moved) {
      this.setState({ moved: false });
      return;
    }

    const doc = ownerDocument(this.node);

    /* istanbul ignore else */
    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !this.node.contains(event.target)
    ) {
      if (this.props.onClickAway) {
        this.props.onClickAway(event);
      }
    }
  };

  handleTouchMove = () => {
    this.setState({ moved: true });
  };

  render() {
    const {
      children,
      mouseEvent,
      touchEvent,
      onClickAway,
      ...other
    } = this.props;

    const listenerProps = {};

    if (mouseEvent !== false) {
      listenerProps[mouseEvent] = this.handleClickAway;
    }

    if (touchEvent !== false) {
      listenerProps[touchEvent] = this.handleClickAway;
      listenerProps.onTouchMove = this.handleTouchMove;
    }

    return (
      <>
        {children}
        <EventListener target="document" {...listenerProps} {...other} />
      </>
    );
  }
}

ClickAwayListener.propTypes = {
  /**
   * The wrapped element.
   */
  children: PropTypes.any.isRequired,

  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),

  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: PropTypes.func,

  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd', false]),
};

ClickAwayListener.defaultProps = {
  mouseEvent: 'onMouseUp',
  touchEvent: 'onTouchEnd',
};

export default ClickAwayListener;

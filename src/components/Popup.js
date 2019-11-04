import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Manager, Reference, Popper } from 'react-popper';
import { Transition } from 'react-spring/renderprops.cjs';
import ClickAwayListener from './ClickAwayListener';

export class Popup extends React.Component {
  state = { isOpen: false };

  isControlled(prop) {
    return this.props[prop] !== undefined;
  }

  getState() {
    return Object.entries(this.state).reduce((combinedState, [key, value]) => {
      if (this.isControlled(key)) {
        combinedState[key] = this.props[key];
      } else {
        combinedState[key] = value;
      }
      return combinedState;
    }, {});
  }

  handleToggle = () => {
    if (this.isControlled('isOpen')) {
      this.dispatchOnToggle(!this.getState().isOpen);
    } else {
      this.setState(
        ({ isOpen }) => ({ isOpen: !isOpen }),
        () => {
          this.dispatchOnToggle(this.getState().isOpen);
        }
      );
    }
  };

  handleClose = () => {
    if (this.isControlled('isOpen')) {
      this.dispatchOnToggle(false);
    } else {
      this.setState(
        ({ isOpen }) => ({ isOpen: false }),
        () => {
          this.dispatchOnToggle(false);
        }
      );
    }
  };

  handleClickAway = e => {
    /* istanbul ignore else */
    if (this.getState().isOpen) {
      if (!this.isControlled('isOpen') && this.props.closeOnOutsideClick) {
        this.setState({ isOpen: false });
      }

      if (this.props.onOutsideClick) {
        this.props.onOutsideClick(e);
      }
    }
  };

  dispatchOnToggle = nextIsOpen => {
    if (this.props.onToggle) {
      this.props.onToggle(nextIsOpen);
    }
  };

  render() {
    const { content, children, placement: popupPlacement } = this.props;
    return (
      <Manager>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <Reference>
            {({ ref }) =>
              children({
                ref,
                toggle: this.handleToggle,
                isOpen: this.getState().isOpen,
              })
            }
          </Reference>
          {ReactDOM.createPortal(
            <Popper positionFixed placement={popupPlacement}>
              {({ ref, style: popperStyles, ...otherPopperProps }) => (
                <Transition
                  items={this.getState().isOpen}
                  config={
                    /* istanbul ignore next */ () => key =>
                      key === 'opacity'
                        ? { tension: 400, clamp: true }
                        : { tension: 400 }
                  }
                  from={{ opacity: 0, transform: 'scale(0.8)' }}
                  enter={{ opacity: 1, transform: 'scale(1)' }}
                  leave={{ opacity: 0, transform: 'scale(0.8)' }}
                >
                  {isOpen =>
                    isOpen &&
                    (animationStyles => (
                      <div ref={ref} style={popperStyles} data-testid="popup">
                        <div style={animationStyles}>
                          {content({
                            ...otherPopperProps,
                            close: this.handleClose,
                          })}
                        </div>
                      </div>
                    ))
                  }
                </Transition>
              )}
            </Popper>,
            document.body
          )}
        </ClickAwayListener>
      </Manager>
    );
  }
}

Popup.propTypes = {
  /**
   * A flag indicating open/closed state of the popup. Note that if this prop is undefined (not
   * set) then the component is uncontrolled and can open/close by itself. Otherwise it is fully
   * controlled by parent.
   */
  isOpen: PropTypes.bool,

  /**
   * A callback that will be called when the component is in controlled mode and needs to toggle
   * its open/closed state (because the button is clicked). The argument is the next desired state
   * of the component.
   */
  onToggle: PropTypes.func,

  /**
   * Callback when outside is clicked.
   */
  onOutsideClick: PropTypes.func,

  /**
   * Whether the popup should be closed when click outside in uncontrolled mode.
   */
  closeOnOutsideClick: PropTypes.bool,

  /**
   * Alignment of the popup relative to the element.
   */
  placement: PropTypes.string,

  /**
   * Wrapper element.
   */
  children: PropTypes.func.isRequired,

  /**
   * Content to show when popup is open.
   */
  content: PropTypes.func.isRequired,
};

Popup.defaultProps = {
  placement: 'bottom-start',
  closeOnOutsideClick: true,
};

export default Popup;

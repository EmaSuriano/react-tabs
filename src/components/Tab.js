import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

const DEFAULT_CLASS = 'react-tabs__tab';

export default class Tab extends Component {
  static defaultProps = {
    className: DEFAULT_CLASS,
    disabledClassName: `${DEFAULT_CLASS}--disabled`,
    focus: false,
    id: null,
    panelId: null,
    selected: false,
    selectedClassName: `${DEFAULT_CLASS}--selected`,
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    disabled: PropTypes.bool,
    disabledClassName: PropTypes.string, // private
    focus: PropTypes.bool, // private
    id: PropTypes.string, // private
    panelId: PropTypes.string, // private
    selected: PropTypes.bool, // private
    selectedClassName: PropTypes.string, // private
    tabRef: PropTypes.func, // private
  };

  componentDidMount() {
    this.checkFocus();
  }

  componentDidUpdate() {
    this.checkFocus();
  }

  checkFocus() {
    if (this.props.selected && this.props.focus) {
      this.node.focus();
    }
  }

  render() {
    const {
      children,
      className,
      disabled,
      disabledClassName,
      focus, // unused
      id,
      panelId,
      selected,
      selectedClassName,
      tabRef,
      ...attributes
    } = this.props;

    return (
      <li
        {...attributes}
        className={cx(className, {
          [selectedClassName]: selected,
          [disabledClassName]: disabled,
        })}
        ref={node => {
          this.node = node;
          if (tabRef) tabRef(node);
        }}
        role="tab"
        id={id}
        aria-selected={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-controls={panelId}
        tabIndex={selected ? '0' : null}
      >
        {children}
      </li>
    );
  }
}

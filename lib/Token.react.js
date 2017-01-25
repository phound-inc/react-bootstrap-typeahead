'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _noop2 = require('lodash/noop');

var _noop3 = _interopRequireDefault(_noop2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tokenBehaviors = require('./containers/tokenBehaviors');

var _tokenBehaviors2 = _interopRequireDefault(_tokenBehaviors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * Token
 *
 * Individual token component, generally displayed within the TokenizerInput
 * component, but can also be rendered on its own.
 */
var Token = _react2.default.createClass({
  displayName: 'Token',

  propTypes: {
    /**
     * Handler for removing/deleting the token. If not defined, the token will
     * be rendered in a read-only state.
     */
    onRemove: _react.PropTypes.func,
    selected: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onRemove: _noop3.default,
      selected: false
    };
  },
  render: function render() {
    return this.props.onRemove && !this.props.disabled ? this._renderRemoveableToken() : this._renderToken();
  },
  _renderRemoveableToken: function _renderRemoveableToken() {
    var _props = this.props,
        children = _props.children,
        className = _props.className,
        onRemove = _props.onRemove,
        selected = _props.selected,
        tabEnabled = _props.tabEnabled,
        otherProps = _objectWithoutProperties(_props, ['children', 'className', 'onRemove', 'selected', 'tabEnabled']);

    return _react2.default.createElement(
      'div',
      _extends({}, otherProps, {
        className: (0, _classnames2.default)('token', 'token-removeable', {
          'token-selected': selected
        }, className),
        tabIndex: tabEnabled ? 0 : -1 }),
      children,
      _react2.default.createElement(
        'span',
        {
          className: 'close-button',
          onClick: onRemove,
          role: 'button' },
        '\xD7'
      )
    );
  },
  _renderToken: function _renderToken() {
    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        disabled = _props2.disabled,
        href = _props2.href;

    var classnames = (0, _classnames2.default)('token', className);

    if (href) {
      return _react2.default.createElement(
        'a',
        { className: classnames, disabled: disabled, href: href },
        children
      );
    }

    return _react2.default.createElement(
      'div',
      { className: classnames, disabled: disabled },
      children
    );
  }
});

exports.default = (0, _tokenBehaviors2.default)(Token);
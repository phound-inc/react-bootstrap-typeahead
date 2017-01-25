'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextInput = require('./TextInput.react');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _getHintText = require('./utils/getHintText');

var _getHintText2 = _interopRequireDefault(_getHintText);

var _getInputText = require('./utils/getInputText');

var _getInputText2 = _interopRequireDefault(_getInputText);

var _keyCode = require('./utils/keyCode');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TypeaheadInput
 *
 * Handles a single selection from the Typeahead component.
 */
var TypeaheadInput = _react2.default.createClass({
  displayName: 'TypeaheadInput',

  /**
   * In addition to the propTypes below, the following props are automatically
   * passed down by `Typeahead.react`:
   *
   *  - activeIndex
   *  - labelKey
   *  - onAdd
   *  - onBlur
   *  - onChange
   *  - onClick
   *  - onFocus
   *  - onKeydown
   *  - onRemove
   *  - options
   *  - selected
   *  - text
   */
  propTypes: {
    /**
     * Whether to disable the input and any selection, if present.
     */
    disabled: _react.PropTypes.bool,
    /**
     * Name property for the input.
     */
    name: _react.PropTypes.string,
    /**
     * Placeholder text for the input.
     */
    placeholder: _react.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      isFocused: false
    };
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (this.props.activeIndex !== prevProps.activeIndex) {
      var inputText = (0, _getInputText2.default)(this.props);
      this._input.getInstance().selectionStart = inputText.length;
    }
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        bsSize = _props.bsSize,
        className = _props.className,
        disabled = _props.disabled,
        name = _props.name,
        onFocus = _props.onFocus,
        placeholder = _props.placeholder,
        selected = _props.selected;


    var inputProps = { bsSize: bsSize, disabled: disabled, name: name, onFocus: onFocus, placeholder: placeholder };

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('bootstrap-typeahead-input', className),
        onClick: this._handleInputFocus,
        onFocus: this._handleInputFocus,
        style: {
          outline: 'none',
          position: 'relative'
        },
        tabIndex: -1 },
      _react2.default.createElement(_TextInput2.default, _extends({}, inputProps, {
        autoComplete: 'off',
        className: (0, _classnames2.default)('bootstrap-typeahead-input-main', {
          'has-selection': !!selected.length
        }),
        onBlur: this._handleBlur,
        onChange: this._handleChange,
        onKeyDown: this._handleKeydown,
        ref: function ref(input) {
          return _this._input = input;
        },
        style: {
          backgroundColor: !disabled && 'transparent',
          display: 'block',
          position: 'relative',
          zIndex: 1
        },
        value: (0, _getInputText2.default)(this.props)
      })),
      _react2.default.createElement(_TextInput2.default, {
        bsSize: bsSize,
        className: (0, _classnames2.default)('bootstrap-typeahead-input-hint'),
        style: {
          borderColor: 'transparent',
          bottom: 0,
          boxShadow: 'none',
          display: 'block',
          opacity: 0.6,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 0
        },
        tabIndex: -1,
        value: (0, _getHintText2.default)(this.props, this.state.isFocused)
      })
    );
  },
  blur: function blur() {
    this._input.getInstance().blur();
  },
  focus: function focus() {
    this._handleInputFocus();
  },
  _handleBlur: function _handleBlur(e) {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
  },
  _handleChange: function _handleChange(e) {
    // Clear any selections when text is entered.
    var _props2 = this.props,
        onRemove = _props2.onRemove,
        selected = _props2.selected;

    !!selected.length && onRemove((0, _head3.default)(selected));

    this.props.onChange(e.target.value);
  },


  /**
   * If the containing parent div is focused or clicked, focus the input.
   */
  _handleInputFocus: function _handleInputFocus(e) {
    this.setState({ isFocused: true });
    this._input.getInstance().focus();
  },
  _handleKeydown: function _handleKeydown(e) {
    var _props3 = this.props,
        activeIndex = _props3.activeIndex,
        options = _props3.options,
        onAdd = _props3.onAdd,
        selected = _props3.selected,
        text = _props3.text;


    switch (e.keyCode) {
      case _keyCode.RIGHT:
      case _keyCode.TAB:
        var cursorPos = this._input.getInstance().selectionStart;
        var hasHintText = !!(0, _getHintText2.default)(this.props, this.state.isFocused);

        // Autocomplete the selection if all of the following are true:
        if (
        // There's a hint or a menu item is highlighted.
        (hasHintText || activeIndex !== -1) &&
        // There's no current selection.
        !selected.length &&
        // The input cursor is at the end of the text string when the user
        // hits the right arrow key.
        !(e.keyCode === _keyCode.RIGHT && cursorPos !== text.length)) {
          e.preventDefault();

          var selectedOption = hasHintText ? (0, _head3.default)(options) : options[activeIndex];

          onAdd && onAdd(selectedOption);
        }
        break;
    }

    this.props.onKeyDown(e);
  }
});

exports.default = TypeaheadInput;
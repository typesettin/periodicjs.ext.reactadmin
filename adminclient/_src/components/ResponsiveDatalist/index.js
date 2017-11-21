'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _reBulma = require('re-bulma');

var rb = _interopRequireWildcard(_reBulma);

var _util = require('../../util');

var _util2 = _interopRequireDefault(_util);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import debounce from 'debounce';

// import flatten from 'flat';
var propTypes = {
  disabled: _react.PropTypes.bool,
  selector: _react.PropTypes.string,
  displayfield: _react.PropTypes.string,
  displayProps: _react.PropTypes.object,
  dbname: _react.PropTypes.string,
  multi: _react.PropTypes.bool,
  createable: _react.PropTypes.bool,
  flattenDataList: _react.PropTypes.bool,
  flattenDataListOptions: _react.PropTypes.any,
  resourceUrl: _react.PropTypes.string,
  createResourceUrl: _react.PropTypes.string,
  data: _react.PropTypes.array,
  selectedData: _react.PropTypes.any,
  value: _react.PropTypes.any,
  onChange: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  limit: _react.PropTypes.number,
  datalistdata: _react.PropTypes.array
};

var defaultProps = {
  disabled: false,
  data: false,
  selectedData: [],
  createable: false,
  value: undefined,
  displayProps: {},
  flattenDataList: true,
  flattenDataListOptions: {},
  selector: '_id',
  displayField: 'title',
  dbname: 'periodic',
  limit: 10,
  datalistdata: [],
  onChange: function onChange(data) {
    console.debug('ResponsiveDatalist onChange', { data: data });
  },
  onFocus: function onFocus(data) {
    console.debug('ResponsiveDatalist onFocus', { data: data });
  }
};

var ResponsiveDatalist = function (_Component) {
  (0, _inherits3.default)(ResponsiveDatalist, _Component);

  function ResponsiveDatalist(props) {
    (0, _classCallCheck3.default)(this, ResponsiveDatalist);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveDatalist.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveDatalist)).call(this, props));

    _this.state = {
      disabled: props.disabled,
      data: props.data,
      value: props.value,
      selectedData: props.selectedData,
      isSearching: false
    };
    _this.inputProps = (0, _assign2.default)({}, _this.props.passableProps);
    // this.searchFunction = debounce(this.updateDataList, 200);
    _this.searchFunction = _this.updateDataList.bind(_this);
    _this.filterStaticData = _this.filterStaticData.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ResponsiveDatalist, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {}
  }, {
    key: 'filterStaticData',
    value: function filterStaticData(options) {
      var _this2 = this;

      return options.search ? this.props.datalistdata.filter(function (item) {
        return item[_this2.props.field].indexOf(options.search) > -1;
      }) : this.props.datalistdata;
    }
  }, {
    key: 'updateDataList',
    value: function updateDataList(options) {
      var _this3 = this;

      if (this.props.resourceUrl) {
        this.setState({ isSearching: true });
        var stateProps = this.props.getState();
        var fetchURL = this.props.resourceUrl + '&' + _querystring2.default.stringify({
          limit: this.props.limit,
          // sort: (newSortOptions.sortProp)
          //   ? `${newSortOptions.sortOrder}${newSortOptions.sortProp}`
          //   : undefined,
          search: options.search,
          allowSpecialCharacters: true
        });
        var headers = (0, _assign2.default)({
          'x-access-token': stateProps.user.jwt_token
        }, stateProps.settings.userprofile.options.headers);
        _util2.default.fetchComponent(fetchURL, { headers: headers })().then(function (response) {
          var updatedState = {};
          updatedState.selectedData = response[(0, _pluralize2.default)(_this3.props.entity)];
          updatedState.isSearching = false;
          // console.debug({updatedState,response});
          _this3.setState(updatedState);
        }, function (e) {
          _this3.props.errorNotification(e);
        });
      } else if (this.props.staticSearch) {

        this.setState({ isSearching: true });
        //options.search is the actual content
        var updatedState = {};
        updatedState.selectedData = this.filterStaticData(options);
        updatedState.isSearching = false;
        // console.debug({updatedState,response});
        this.setState(updatedState);

        //value is the array of selected values
        //selectedData is the filtered list that changes everytime user types
      } else {
        console.debug({ options: options });
      }
    }
  }, {
    key: 'onChangeHandler',
    value: function onChangeHandler(event) {
      this.searchFunction({ search: event.target.value || '' });
    }
  }, {
    key: 'onFocusHandler',
    value: function onFocusHandler(event) {
      var updatedState = {};
      updatedState.selectedData = this.props.datalistdata.map(function (data) {
        return data.value;
      });
      updatedState.isSearching = false;
      this.setState(updatedState);
    }
  }, {
    key: 'getDatalistDisplay',
    value: function getDatalistDisplay(options) {
      var displayField = options.displayField,
          selector = options.selector,
          datum = options.datum;

      var displayText = datum[displayField] || datum.title || datum.name || datum.username || datum.email || datum[selector] || (datum && typeof datum === 'string' ? datum : '');
      return _react2.default.createElement(
        'span',
        { style: {
            wordBreak: 'break-all',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          } },
        datum && datum.fileurl && datum.transform && datum.transform.preview ? _react2.default.createElement(rb.Image, { src: datum.transform.preview, size: 'is24X24', style: { float: 'left', marginRight: '5px' } }) : null,
        this.props.resourcePreview ? _react2.default.createElement(
          _reactRouter.Link,
          { title: datum.title || displayText, to: this.props.resourcePreview + '/' + (datum[selector] || datum) },
          displayText
        ) : displayText,
        this.props.resourceDescription ? _react2.default.createElement(
          rb.Content,
          null,
          _react2.default.createElement(
            'p',
            null,
            datum.description
          )
        ) : null
      );
    }
  }, {
    key: 'removeDatalistItem',
    value: function removeDatalistItem(index) {
      // console.debug('clicked datalist',{index});
      // console.debug('clicked onclick',this.props);
      if (this.props.multi) {
        var newValue = [].concat(this.state.value);
        newValue.splice(index, 1);
        // let oldValue = this.state.value;
        // console.debug({ oldValue, newValue });
        this.setState({
          value: newValue,
          selectedData: false
        });
        this.props.onChange(newValue);
      } else {
        var datum = undefined;
        this.setState({
          value: datum,
          selectedData: false
        });
        // console.debug({ datum });
        this.props.onChange(datum);
      }
    }
  }, {
    key: 'onBlurHandler',
    value: function onBlurHandler() {
      var _this4 = this;

      setTimeout(function () {
        _this4.setState({ selectedData: [] });
      }, 400);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      try {
        var notificationStyle = {
          marginBottom: '5px',
          padding: '5px',
          border: '1px solid lightgrey'
        };
        var notificationCloseStyle = {
          margin: '0px 0px 0px 20px',
          borderRadius: '19px'
        };
        var selectData = this.props.multi ? this.state.value && this.state.value.length ? this.state.value.map(function (selected, k) {
          return _react2.default.createElement(
            rb.Notification,
            {
              key: k,
              enableCloseButton: true,
              closeButtonProps: {
                onClick: _this5.removeDatalistItem.bind(_this5, k),
                style: notificationCloseStyle
              },
              style: notificationStyle
            },
            _this5.getDatalistDisplay({
              datum: selected,
              displayField: _this5.props.displayField,
              selector: _this5.props.selector
            })
          );
        }) : null : this.state.value ? _react2.default.createElement(
          rb.Notification,
          {
            enableCloseButton: true,
            closeButtonProps: {
              onClick: this.removeDatalistItem.bind(this),
              style: notificationCloseStyle
            },
            style: notificationStyle
          },
          this.getDatalistDisplay({
            datum: this.state.value,
            displayField: this.props.displayField,
            selector: this.props.selector
          })
        ) : null;

        var displayOptions = Array.isArray(this.state.selectedData) && this.state.selectedData && this.state.selectedData.length ? this.state.selectedData.map(function (datum, k) {
          return _react2.default.createElement(
            rb.Notification,
            {
              key: k,
              color: 'isWhite',
              style: notificationStyle
            },
            _react2.default.createElement(rb.Button, {
              icon: 'fa fa-plus',
              size: 'isSmall',
              style: {
                alignSelf: 'flex-end',
                borderRadius: '20px',
                float: 'right',
                paddingRight: '0px'
              },
              onClick: function onClick() {
                if (_this5.props.multi) {
                  var newValue = _this5.state.value && Array.isArray(_this5.state.value) && _this5.state.value.length ? _this5.state.value.concat([datum]) : [datum];
                  _this5.setState({
                    value: newValue,
                    selectedData: false
                  });
                  _this5.props.onChange(newValue);
                } else {
                  _this5.setState({
                    value: datum,
                    selectedData: false
                  });
                  _this5.props.onChange(datum);
                }
              } }),
            _this5.getDatalistDisplay({
              datum: datum,
              displayField: _this5.props.displayField,
              selector: _this5.props.selector
            })
          );
        }) : null;

        return _react2.default.createElement(
          'div',
          this.props.wrapperProps,
          _react2.default.createElement(
            'div',
            { style: { width: '100%' } },
            _react2.default.createElement(rb.Input, (0, _extends3.default)({}, this.inputProps, {
              state: this.state.isSearching || undefined,
              onChange: this.onChangeHandler.bind(this),
              onFocus: this.onChangeHandler.bind(this),
              onBlur: this.onBlurHandler.bind(this),
              ref: function ref(input) {
                _this5.textInput = input;
              }
            }))
          ),
          _react2.default.createElement(
            'div',
            this.props.displayProps,
            ' ',
            displayOptions
          ),
          _react2.default.createElement(
            'div',
            null,
            selectData
          )
        );
      } catch (e) {
        console.error(e);
        return _react2.default.createElement(
          'span',
          null,
          'some error'
        );
      }
    }
  }]);
  return ResponsiveDatalist;
}(_react.Component);

ResponsiveDatalist.propType = propTypes;
ResponsiveDatalist.defaultProps = defaultProps;

exports.default = ResponsiveDatalist;
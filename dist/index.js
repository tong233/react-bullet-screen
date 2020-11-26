"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * 水平无限循环弹幕
 */
var Bullet = /*#__PURE__*/function (_PureComponent) {
  _inherits(Bullet, _PureComponent);

  var _super = _createSuper(Bullet);

  function Bullet(props) {
    var _this;

    _classCallCheck(this, Bullet);

    _this = _super.call(this, props);
    _this.launchedCount = 0; // 已经发射的弹幕数

    return _this;
  }

  _createClass(Bullet, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      var _this$props = this.props,
          data = _this$props.data,
          row = _this$props.row; // 设定时器避免初始化拿不到宽度

      setTimeout(function () {
        _this2.srollWidth = _this2.bulletRef ? _this2.bulletRef.offsetWidth : document.body.clientWidth;

        var _loop = function _loop() {
          var bullet = data[_this2.launchedCount];
          var count = _this2.launchedCount;
          setTimeout(function () {
            _this2.launchBarrge(bullet, count);
          }, count * 1500);
          _this2.launchedCount++;
        };

        while (_this2.launchedCount < row) {
          _loop();
        }
      }, 20);
    }
    /**
     * 发射弹幕
     */

  }, {
    key: "launchBarrge",
    value: function launchBarrge(bullet, rowIndex) {
      var _this3 = this;

      if (!bullet) return;
      var bulletEle = this.createBulletEle(bullet, rowIndex);
      if (this.bulletRef) this.bulletRef.appendChild(bulletEle);
      var _this$props2 = this.props,
          data = _this$props2.data,
          speed = _this$props2.speed,
          spacing = _this$props2.spacing;
      var bulletWidth = bulletEle.offsetWidth; // 拿不到宽度按一屏处理

      if (bulletWidth === 0) bulletWidth = this.srollWidth; // 全程滚动距离

      var distance = this.srollWidth + bulletWidth;
      var duration = distance / speed; // 弹幕滚动至spacing所需时间

      var time = (bulletWidth + spacing) / speed;
      bulletEle.style.transform = "translateX(".concat(-distance, "px)");
      bulletEle.style.transition = "transform ".concat(duration, "s linear"); // 当弹幕拉开距离spacing时发射下一个弹幕

      this.timer = window.setTimeout(function () {
        var nextBullet = data[_this3.launchedCount % data.length];

        _this3.launchBarrge(nextBullet, rowIndex);

        _this3.launchedCount++;
      }, time * 1000);
    }
    /**
     * 创建弹幕元素
     * @param {*} bullet
     * @param {*} rowIndex // 所在行
     */

  }, {
    key: "createBulletEle",
    value: function createBulletEle(bullet, rowIndex) {
      var _this4 = this;

      var _this$props3 = this.props,
          renderItem = _this$props3.renderItem,
          rowHeight = _this$props3.rowHeight;
      var div = document.createElement('div');
      div.classList.add('bullet-item');
      div.style.top = "".concat(rowIndex * rowHeight, "px");
      div.style.left = "".concat(this.srollWidth, "px");
      div.style.position = 'absolute';
      div.style.whiteSpace = 'nowrap';

      var handleTransitionEnd = function handleTransitionEnd() {
        // 弹幕运动完成后移除监听，清除弹幕
        div.removeEventListener('transitionend', handleTransitionEnd);

        _this4.bulletRef.removeChild(div);
      };

      div.addEventListener('transitionend', handleTransitionEnd);

      _reactDom["default"].render(renderItem(bullet), div);

      return div;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props4 = this.props,
          row = _this$props4.row,
          rowHeight = _this$props4.rowHeight;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "react-bullet-screen",
        style: {
          position: 'relative',
          overflow: 'hidden',
          minHeight: "".concat(row * rowHeight, "px")
        },
        ref: function ref(_ref) {
          _this5.bulletRef = _ref;
        }
      });
    }
  }]);

  return Bullet;
}(_react.PureComponent);

Bullet.defaultProps = {
  speed: 50,
  row: 3,
  rowHeight: 40,
  spacing: 120,
  renderItem: function renderItem() {
    return undefined;
  }
};
var _default = Bullet;
exports["default"] = _default;
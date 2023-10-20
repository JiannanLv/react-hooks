import _extends from "babel-runtime/helpers/extends";
import _toConsumableArray from "babel-runtime/helpers/toConsumableArray";
import _Object$getPrototypeOf from "babel-runtime/core-js/object/get-prototype-of";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import _possibleConstructorReturn from "babel-runtime/helpers/possibleConstructorReturn";
import _inherits from "babel-runtime/helpers/inherits";

import React, { Component } from "react";
import echarts from "echarts";

import option from "./option";
import foolEdit from "./foolEdit";

var EchartsReact = (function (_Component) {
  _inherits(EchartsReact, _Component);

  function EchartsReact(props) {
    _classCallCheck(this, EchartsReact);

    var _this = _possibleConstructorReturn(
      this,
      (EchartsReact.__proto__ || _Object$getPrototypeOf(EchartsReact)).call(
        this,
        props
      )
    );

    _this.dispose = function () {
      if (_this.echartsElement) {
        try {
          _this.chartCore.dispose(_this.echartsElement);
        } catch (err) {
          console.error(err);
        }
      }
    };

    _this.getChartCore = function () {
      return _this.chartCore || echarts.init(_this.echartsElement);
    };

    _this.chartResize = function () {
      try {
        _this.getChartCore().resize();
      } catch (err) {
        console.error(err);
      }
    };

    return _this;
  }

  _createClass(EchartsReact, [
    {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.chartCore = echarts.init(this.echartElement);
        this.rerender(this.props);
        this.bindEvent();
        this.renderAnimation(this.props);
      },
    },
    {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        this.updateChart(nextProps);
        return false;
      },
    },
    {
      key: "updateChart",
      value: function updateChart(nextProps) {
        if (
          this.props.style.width !== nextProps.style.width ||
          this.props.style.height !== nextProps.style.height
        ) {
          this.chartResize();
          return false;
        } else if (
          this.props.style.top !== nextProps.style.top ||
          this.props.style.left !== nextProps.style.left
        ) {
          return false;
        }
        if (this.props.animationTime !== nextProps.animationTime) {
          this.renderAnimation(nextProps);
          return;
        }
        this.rerender(nextProps);
      },
    },
    {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.dispose();
        this.timer && clearInterval(this.timer);
      },
      // 销毁
    },
    {
      key: "renderAnimation",
      value: function renderAnimation(props) {
        var _this2 = this;

        var animationTime = props.animationTime,
          option = props.option;

        this.timer && clearInterval(this.timer);
        if (animationTime) {
          this.timer = setInterval(function () {
            _this2.getChartCore().clear();
            _this2.rerender({ option: option });
          }, animationTime * 1000);
        }
      },
    },
    {
      key: "bindEvent",
      value: function bindEvent() {
        var eventCb = this.props.eventCb;

        this.getChartCore().on("click", function (event) {
          eventCb && eventCb(event);
        });
      },
      // 获取 dom 容器上的实例。
    },
    {
      key: "changeData",
      value: function changeData(option) {
        var source = option.dataset.source,
          valueMax = option.valueMax,
          opacityItem = option.opacityItem,
          itemWidth = option.itemWidth;

        var newName = source.slice(1).map(function (item) {
          return item[0];
        });
        var newValue = source.slice(1).map(function (item) {
          return item[1];
        });
        var spacing = (60 - newValue.length * itemWidth) / newValue.length;
        var max =
          typeof valueMax == "number"
            ? valueMax
            : valueMax == "sum"
            ? newValue.reduce(function (a, b) {
                return a + b;
              })
            : Math.max.apply(Math, _toConsumableArray(newValue)) * 1.2;

        return option.updateIn(["series"], function (data) {
          return newName.map(function (item, index) {
            return (data[index] || data[0])
              .set("data", [
                _extends(
                  { value: max - newValue[index], name: "" },
                  opacityItem
                ),
                { value: newValue[index], name: item },
              ])
              .set("radius", [
                80 - index * (spacing + itemWidth) + "%",
                80 - index * (spacing + itemWidth) - itemWidth + "%",
              ]);
          });
        });
      },
    },
    {
      key: "rerender",
      value: function rerender(_ref) {
        var option = _ref.option;

        var newOption = this.changeData(option);
        try {
          this.getChartCore().setOption(newOption, true);
        } catch (err) {
          console.error(err);
        }
      },
    },
    {
      key: "render",
      value: function render() {
        var _this3 = this;

        return React.createElement("div", {
          className: "echartsElement",
          ref: function ref(e) {
            return (_this3.echartElement = e);
          },
          style: { width: "100%", height: "100%" },
        });
      },
    },
  ]);

  return EchartsReact;
})(Component);

export default {
  Component: EchartsReact,
  option: option,
  foolEdit: foolEdit,
};

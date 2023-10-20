import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import { Icon } from "antd";

//按需加载组件
const TestModule = Loadable({
  loader: () => import("./TestModule").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
// 威胁态势组件
const WarnInfo = Loadable({
  loader: () => import("../components/warnInfo").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
// 综合态势-资产概况
const AssetsOverview = Loadable({
  loader: () => import("../components/assetsOverview").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
// 态势工作台-受害资产Top
const VictimRankTop = Loadable({
  loader: () => import("../components/victimRankTop").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
// 重保大屏-监测报告
const MonitoringReport = Loadable({
  loader: () => import("../components/monitoringReport").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
// 重保大屏-重点关注资产威胁监测
const FocusAssetsWarn = Loadable({
  loader: () => import("../components/focusAssetsWarn").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
// 重保大屏-倒计时
const CountDown = Loadable({
  loader: () => import("../components/countDown").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
// 重保大屏-值班信息
const OnDutyInfo = Loadable({
  loader: () => import("../components/onDutyInfo").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
// 暴漏面安全-异常外联分析
const OutreachAnalysis = Loadable({
  loader: () => import("../components/outreachAnalysis").then((M) => M.default),
  loading: () => <Icon className="loading" type="loading" />,
});
const mapStateToProps = (store) => {
  const { common } = store;
  return { common };
};

@connect(mapStateToProps)
export default class PrimaryContainer extends Component {
  componentDidMount() {}
  render() {
    const { match } = this.props;
    // path={`${match.path}/:spaceId/layout/:pageId`}
    return (
      <React.Fragment>
        <Switch>
          <Route path={`${match.path}/test`} component={TestModule} />
          <Route path={`${match.path}/warnInfo`} component={WarnInfo} />
          <Route
            path={`${match.path}/assetsOverview`}
            component={AssetsOverview}
          />
          <Route
            path={`${match.path}/victimRankTop`}
            component={VictimRankTop}
          />
          <Route
            path={`${match.path}/monitoringReport`}
            component={MonitoringReport}
          />
          <Route path={`${match.path}/countDown`} component={CountDown} />
          <Route
            path={`${match.path}/focusAssetsWarn`}
            component={FocusAssetsWarn}
          />
          <Route
            path={`${match.path}/outreachAnalysis`}
            component={OutreachAnalysis}
          />
          <Route path={`${match.path}/onDutyInfo`} component={OnDutyInfo} />
          <Redirect to={`${match.url}/test`} />
        </Switch>
      </React.Fragment>
    );
  }
}

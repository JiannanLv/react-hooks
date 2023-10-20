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
          <Redirect to={`${match.url}/test`} />
        </Switch>
      </React.Fragment>
    );
  }
}

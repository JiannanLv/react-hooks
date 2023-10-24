import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
// import { Router } from "react-router";
import PrimaryContainer from "./primaryContainer";

import "@/styles/app.scss";

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.shape({
      asyncReducers: PropTypes.object,
      asyncSagas: PropTypes.object,
      dispatch: PropTypes.func,
      getState: PropTypes.func,
      subscribe: PropTypes.func,
    }).isRequired,
  };

  /**
   * @description 渲染应用主render方法
   * @returns {document} 页面主框架
   * @memberof AppContainer
   */
  render() {
    const { store } = this.props;
    return (
      <ReduxProvider store={store}>
        <ConnectedRouter history={store.history}>
          <Switch>
            <Route path="/react" component={PrimaryContainer} />
            <Redirect to="/react" />
          </Switch>
        </ConnectedRouter>
      </ReduxProvider>
    );
  }
}
export default AppContainer;

import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "@/routes";

const mapStateToProps = (store) => {
  const { common } = store;
  return { common };
};

@connect(mapStateToProps)
export default class PrimaryContainer extends Component {
  renderRoutes = (path, routesList) => {
    routesList = routesList || routes;
    const redirect = routesList.find((x) => x.redirect);
    return (
      <Switch>
        {routesList.map((x) => {
          return (
            <Route
              path={`${path}/${x.path}`}
              key={x.path}
              component={() => (
                <x.component routes={x.children} path={`${path}/${x.path}`} />
              )}
            />
          );
        })}
        {redirect ? <Redirect to={`${path}/${redirect.path}`} /> : null}
      </Switch>
    );
  };
  render() {
    const { match } = this.props;
    console.log(match, "match");
    return <React.Fragment>{this.renderRoutes(match.path)}</React.Fragment>;
  }
}

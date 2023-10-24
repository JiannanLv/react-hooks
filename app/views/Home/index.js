import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Header from "@/components/Header";
import NavMenu from "@/components/NavMenu";

// css
import "./style.scss";

const Home = (props) => {
  const renderRoutes = () => {
    const { routes = [], path } = props;
    const redirect = routes.find((x) => x.redirect);
    return (
      <Switch>
        {routes.map((x) => {
          return (
            <Route
              path={`${path}/${x.path}`}
              key={x.path}
              component={() => <x.component routes={x.children} />}
            />
          );
        })}
        {redirect ? <Redirect to={`${path}/${redirect.path}`} /> : null}
      </Switch>
    );
  };
  return (
    <div className="home-layout">
      <Header />
      <div className="home-layout-content">
        <NavMenu />
        <div className="home-content">{renderRoutes()}</div>
      </div>
    </div>
  );
};

export default Home;

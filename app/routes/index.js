import React from "react";
import Loadable from "react-loadable";
import { LoadingOutlined } from "@ant-design/icons";

const TestModule = Loadable({
  loader: () => import("@/views/TestModule").then((M) => M.default),
  loading: () => <LoadingOutlined className="loading" />,
});
const Home = Loadable({
  loader: () => import("@/views/Home").then((M) => M.default),
  loading: () => <LoadingOutlined className="loading" />,
});
const Use = Loadable({
  loader: () => import("@/containers/React/Hooks/Use").then((M) => M.default),
  loading: () => <LoadingOutlined className="loading" />,
});
const UseCallback = Loadable({
  loader: () =>
    import("@/containers/React/Hooks/UseCallback").then((M) => M.default),
  loading: () => <LoadingOutlined className="loading" />,
});
const routes = [
  {
    path: "home",
    component: Home,
    redirect: true,
    children: [
      {
        path: "use",
        component: Use,
        redirect: true,
      },
      {
        path: "useCallback",
        component: UseCallback,
        redirect: false,
      },
    ],
  },
  {
    path: "test",
    component: TestModule,
    redirect: false,
  },
];

export default routes;

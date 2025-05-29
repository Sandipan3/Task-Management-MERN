import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Task from "../pages/Task";
import Auth from "../pages/Auth";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/my-tasks/:userid",
      //   element: <UserTasks />,
      // },
      {
        path: "/register",
        element: <Auth />,
      },
      {
        path: "/login",
        element: <Auth />,
      },
      {
        path: "tasks/:taskid",
        element: <Task />,
      },
      {
        path: "*",
        element: <div>404 Error not found</div>,
      },
    ],
  },
]);

export default router;

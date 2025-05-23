import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Task from "../pages/Task";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
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

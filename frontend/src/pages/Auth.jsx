import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useLocation, Link } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <div className=" flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center ">
        {currentRoute.split("/")[1].toUpperCase()}
      </h1>
      <div className="flex my-10 gap-10">
        <Link
          to="/login"
          className={`px-4 py-2 rounded-lg text-lg font-semibold ${
            currentRoute === "/login"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`px-4 py-2 rounded-lg text-lg font-semibold ${
            currentRoute === "/register"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Register
        </Link>
      </div>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {currentRoute === "/login" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Auth;

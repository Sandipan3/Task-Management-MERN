//Registration form display and invoke backend api to update UserSchema

import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialState);

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    console.log(formData);
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      axios
        .post("http://localhost:3000/register", formData)
        .then((res) => {
          if (res.status === 201) {
            toast.success("User registration successful");
            setTimeout(() => navigate("/login"), 2000);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          if (
            err.response.status === 400 &&
            err.response.data.message === "User already exists!"
          ) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Registration failed!");
          }
        })
        .finally(() => setFormData(initialState));
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center space-y-6 bg-white p-6 rounded-lg max-w-md  w-full"
    >
      <div className="w-full">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={changeHandler}
          required
          className="w-full border border-gray-300 rounded-lg p-2 "
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={changeHandler}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={8}
          value={formData.password}
          onChange={changeHandler}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <div className="w-full">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          minLength={8}
          value={formData.confirmPassword}
          onChange={changeHandler}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium rounded-lg py-2 hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
};

export default Register;

/** frontend
 * localstorage -> export setter getter
 */

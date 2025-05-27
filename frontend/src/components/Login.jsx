//Login form display and invoke backend api to fetch data from UserSchema with password validation
//UserSchema must send authorization token
import { useState } from "react";
import axios from "axios";
import tokenUtil from "../../util/tokenUtil";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("Logged in:", formData);

    axios
      .post("http://localhost:3000/login", formData)
      .then((res) => {
        const token = res.data.token;

        tokenUtil.setLocalStorageToken(token);

        toast.success("Log In Successful");
        const userid = formData.email;
        console.log(formData);

        // setTimeout(() => navigate(`/my-tasks/${userid}`), 2000);
        setTimeout(() => navigate("/"), 2000);
      })
      .catch((err) => {
        console.error(err);

        if (err.response.status === 401) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Login failed!");
        }
      })
      .finally(() => setFormData(initialState));
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center space-y-6 bg-white p-6 rounded-lg max-w-md w-full"
    >
      <div className="w-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Email Address"
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
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium rounded-lg py-2 hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};

export default Login;

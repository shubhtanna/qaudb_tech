import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authAPI";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5 ">
        <div className="py-5"></div>

        <h1 className="text-3xl text-center">Login Here </h1>

        <form onSubmit={handleOnSubmit}>
          {" "}
          <div className="mt-3">
            <label
              className="block text-sm font-medium mb-2 ps-2"
            >
              Email
            </label>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-opacity-1 text-white"
            />
          </div>
          {/* password */}
          <div className="mt-3">
            <label
              className="block text-sm font-medium mb-2 ps-2"
            >
              Password
            </label>
            <input
              required
            type={"password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
              className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-white text-opacity-1"
            />
          </div>
          <div className="mt-3 text-center">
            <button
              className="px-3 py-2 bg-green-600  rounded hover:bg-green-400"
            >
              Login
            </button>
          </div>
          {/* {JSON.stringify(loginData)} */}
        </form>
      </div>
    </div>
  );
};

export default Login;

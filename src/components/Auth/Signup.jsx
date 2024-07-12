import React, { useState } from "react";
import signUpBanner from "../../assets/signup.svg";
import { signup } from "../../services/operations/authAPI";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../slices/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const { name, email, password, about } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const SignupData = {
      ...formData,
    };

    dispatch(setSignupData(SignupData));
    dispatch(signup(formData,navigate));

    setFormData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5 ">
        <div className="py-5">
          <div className="flex justify-center m-5">
            <img
              src={signUpBanner}
              alt="signup banner"
              style={{
                width: "40%",
              }}
            />
          </div>
          <h1 className="text-3xl text-center">Signup Here </h1>
          <form onSubmit={handleOnSubmit} className="mt-5">
            {" "}
          
            <div className="mt-3">
              <label
                className="block text-sm font-medium mb-2 ps-2"
              >
                Username
              </label>
              <input
               required
            type='text'
            name='name'
            value={name}
            onChange={handleOnChange}
            placeholder='Enter name'
                className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-opacity-1 text-white"
              />
            </div>
          
            <div className="mt-3">
              <label
                className="block text-sm font-medium mb-2 ps-2"
              >
                Email
              </label>
              <input
               required
                type='text'
                name='email'
                value={email}
                onChange={handleOnChange}
                placeholder='Enter email address'
                className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-opacity-1 text-white"
              />
            </div>
            
            <div className="mt-3">
              <label
                className="block text-sm font-medium mb-2 ps-2"
              >
                Password
              </label>
              <input
                className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-opacity-1 text-white"
                required
                type={"password"}
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Enter Password'
              />
            </div>
            
            <div className="mt-3">
              <label
                className="block text-sm font-medium mb-2 ps-2"
              >
                About
              </label>
              <textarea
                className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-opacity-1 text-white"
                required
                type='text'
                name='about'
                value={about}
                onChange={handleOnChange}
                placeholder='Enter email address'
                rows={8}
              ></textarea>
            </div>
            <div className="mt-3 text-center">
              <button
                className="px-3 py-2 bg-green-600  rounded hover:bg-green-400"
              >
                Signup
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

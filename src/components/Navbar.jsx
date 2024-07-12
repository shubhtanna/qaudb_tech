import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CustomNavbar = () => {

  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  }, [user]);

  return (
    <nav className="bg-blue-600 h-16 py-2 px-36 flex justify-between items-center">
      <div className="brand">
        <h1 className="text-2xl font-semibold">
          <a href="/">Task Manager</a>
        </h1>
      </div>
      <div>
        <ul className="flex space-x-5">
          {user && (
            <>
              <li>
                <Link to={"/"} className="hover:text-blue-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/addTask"} className="hover:text-blue-200">
                  Add Task
                </Link>
              </li>
              <li>
                <Link to={"/showTask"} className="hover:text-blue-200">
                  Show Tasks
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-3">
          {user && (
            <>
              <li>
                <Link >{user.name}</Link>
              </li>
              <li>
                <button onClick={() => dispatch(logout(navigate))}>Logout</button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/signup"}>Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;

import './App.css';
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Home from './Pages/HomePage';
import OpenRoute from './components/Auth/OpenRoute';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import CustomNavbar from './components/Navbar';
import AddTask from './components/Task/AddTask';
import ShowTasks from './components/Task/ShowTask';
function App() {
  return (
   <div>
   <CustomNavbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route 
          path="addTask"
          element={
            <PrivateRoute>
              <AddTask/>
            </PrivateRoute>
          }
        />
        <Route 
          path="showTask"
          element={
            <PrivateRoute>
              <ShowTasks/>
            </PrivateRoute>
          }
        />
    </Routes>
    
    <Footer/>
   </div>
  );
}

export default App;

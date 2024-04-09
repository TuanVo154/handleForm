import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import UserProfilePage from "./components/UserProfile/UserProfilePage";
import HomePage from "./components/Home/HomePage";

function App() {
  return (
    <div className="">
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/user-profile"
            element={<UserProfilePage></UserProfilePage>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

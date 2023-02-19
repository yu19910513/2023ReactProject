import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProfilePage from "./pages/Profile/ProfilePage";
import SignUp from "./pages/Signup/Signup";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route exact path="/profile/:id" element={<ProfilePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

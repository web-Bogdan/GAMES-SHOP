import React from 'react';
import "./styles/app.scss";
import LogIn from "./pages/LogIn";
import Registration from "./pages/Registration";
import {Routes, Route} from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </div>
  );
}

export default App;

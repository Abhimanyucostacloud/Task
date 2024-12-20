import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { Toaster } from "react-hot-toast";
import Protected from "./Protected";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* Define the home route */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Protected Component={Home} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

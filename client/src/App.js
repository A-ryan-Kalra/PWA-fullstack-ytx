import React from "react";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div>
      {/* <Button variant="" className="">
        WOOOAh
      </Button> */}
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route element={<ProtectedRoute />}>
        </Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

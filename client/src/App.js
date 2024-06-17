import React from "react";
import RequestUi from "./Components/RequestUi";
import { Button } from "./Components/ui/button";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

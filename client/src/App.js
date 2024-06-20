import React from "react";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import BottomNavigationBar from "./Components/BottomNavigationBar";

function App() {
  return (
    <div>
      <Toaster />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <BottomNavigationBar />
      <Footer />
    </div>
  );
}

export default App;

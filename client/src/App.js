import React from "react";
import Home from "./Components/Home";
import Navigation, { filter1 } from "./Components/Navigation";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import BottomNavigationBar from "./Components/BottomNavigationBar";
import Filter from "./Components/Filter";
import { useAtom } from "jotai";
import ScrollUp from "./Components/ScrollUp";
import Hero from "./Components/Hero";

function App() {
  const [filterImg, setFilterImg] = useAtom(filter1);

  return (
    <div className="">
      <Toaster />
      {filterImg && <Filter />}
      <Navigation />
      <ScrollUp />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/posts" element={<Home />} />
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

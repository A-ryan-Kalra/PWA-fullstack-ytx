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

function App() {
  const [filterImg, setFilterImg] = useAtom(filter1);

  return (
    <div>
      <Toaster />
      {filterImg && <Filter />}
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

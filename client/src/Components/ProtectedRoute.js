import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { showDashboard } from "./Tabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProtectedRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;

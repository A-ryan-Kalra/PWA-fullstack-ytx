import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { showDashboard } from "./Tabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProtectedRoute() {
  const [userData, setUserData] = useState();
  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("userData"));
  //   if (!data.username) {
  //     toast.error("Username does not exit please try to login again!");
  //   } else {
  //     setUserData(data);
  //   }
  // }, []);

  const [dashboardAtom, setDashboardAtom] = useAtom(showDashboard);
  return userData && userData.username ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;

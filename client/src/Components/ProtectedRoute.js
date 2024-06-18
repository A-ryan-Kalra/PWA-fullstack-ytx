import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";
import { showDashboard } from "./Tabs";

function ProtectedRoute() {
  const [dashboardAtom, setDashboardAtom] = useAtom(showDashboard);
  return dashboardAtom ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoute;

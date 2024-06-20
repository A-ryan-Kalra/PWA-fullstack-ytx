import { Navigate, Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Authorization from "../Authorization";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Authorization />;
}

export default ProtectedRoute;

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function Authorization() {
  useEffect(() => {
    toast.error("Authorization required!");
  }, []);

  return <Navigate to={"/"} />;
}

export default Authorization;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function LoggedInRoutes() {
  const user = false;
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default LoggedInRoutes;

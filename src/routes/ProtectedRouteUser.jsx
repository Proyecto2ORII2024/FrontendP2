import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/LoginContext";

function ProtectedRouteUser() {
  const { user, loading } = useContext(AuthContext);

  if (loading){
    return (
      <h1 className="flex items-center justify-center bg-background min-h-screen h-full text-unicoop text-3xl font-bold w-full">
        Un momento por favor...
      </h1>
    );
  }

  return user && user.role === "USER" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRouteUser;

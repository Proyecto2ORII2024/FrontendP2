import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/LoginContext";

/**
 * ProtectedRouteAdmin component ensures that only users with the "ADMIN" role can access the routes it protects.
 * If the user data is still loading, it displays a loading message.
 * If the user is authenticated and has the "ADMIN" role, it renders the child routes.
 * Otherwise, it redirects the user to the home page.
 *
 * @component
 * @returns {JSX.Element} The protected route component.
 */
function ProtectedRouteAdmin() {
  const { user, loading } = useContext(AuthContext);

  if (loading){
    return (
      <h1 className="flex items-center justify-center bg-background min-h-screen h-full text-unicoop text-3xl font-bold w-full">
        Un momento por favor...
      </h1>
    );
  }

  return user && user.role === "ADMIN" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRouteAdmin;

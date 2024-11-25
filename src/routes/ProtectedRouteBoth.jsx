import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/LoginContext";

/**
 * ProtectedRouteBoth component restricts access to routes based on user authentication and role.
 * 
 * This component uses the AuthContext to determine if a user is authenticated and if their role
 * is either "USER" or "ADMIN". If the user is authenticated and has the appropriate role, the 
 * component renders the child routes using the Outlet component. If the user is not authenticated 
 * or does not have the appropriate role, it redirects to the home page ("/").
 * 
 * While the authentication status is being determined (loading), a loading message is displayed.
 * 
 * @component
 * @returns {JSX.Element} The Outlet component if the user is authenticated and authorized, 
 * or a Navigate component to redirect to the home page otherwise.
 */
function ProtectedRouteBoth() {
  const { user, loading } = useContext(AuthContext);

  if (loading){
    return (
      <h1 className="flex items-center justify-center bg-background min-h-screen h-full text-unicoop text-3xl font-bold w-full">
        Un momento por favor...
      </h1>
    );
  }

  return user && (user.role === "USER" || user.role === "ADMIN") ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRouteBoth;

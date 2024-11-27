import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/LoginContext";

/**
 * ProtectedRouteUser component restricts access to routes based on user authentication and role.
 * 
 * This component uses the AuthContext to determine if the user is authenticated and if the user's role is "USER".
 * If the authentication status is still loading, it displays a loading message.
 * If the user is authenticated and has the role "USER", it renders the child routes using the Outlet component.
 * Otherwise, it redirects the user to the home page.
 * 
 * @component
 * @returns {JSX.Element} The rendered component or a redirection to the home page.
 */
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

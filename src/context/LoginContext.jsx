import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { login } from "../services/login.service";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loginError) {
          const timer = setTimeout(() => {
            setLoginError(null);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [loginError]);
    


    const singin = async (userLogin) => {
        try {
            const res = await login(userLogin);
            setUser(jwtDecode(res.data.accessToken));
            localStorage.setItem("user", res.data.accessToken);
            setLoginError(null);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoginError("Usuario o contraseña incorrectos")
          }
    }

    const singout = () => {
        
        setUser(null);

        localStorage.removeItem("user");

        return true;
    }

    return (
        <AuthContext.Provider value={{singin, user, loginError, singout, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
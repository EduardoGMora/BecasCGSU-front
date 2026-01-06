import { createContext, useState, useContext } from "react";
import users from "../mocks/users.json";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

/**
 * AuthProvider component to manage authentication state
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} AuthProvider component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, SetIsAuthenticated] = useState(false)

  const login = async (codigo, password) => {
    try {
      console.log(codigo,password)
      const response = await fetch("http://localhost:8000/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo, password }),
      });

      const result = await response.json();

      console.log(result.success)
      if (result.success) {
        console.log(result.r)
        setUser(result.user);
        SetIsAuthenticated(true)
        return { success: true, role: result.user.role };
      } else {
        return { success: false, message: "Credenciales inválidas" };
      }
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Error de servidor" };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

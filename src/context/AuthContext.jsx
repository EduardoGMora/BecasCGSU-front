import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (codigo, password) => {
    try {
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
        console.log("xc")
        setUser(result.user);
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

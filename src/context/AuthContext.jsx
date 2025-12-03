import { createContext, useContext, useState } from "react";
import {usuarios} from "../utils/users.json";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (codigo, password) => {
    const foundUser = usuarios.find(
      (u) => u.codigo === codigo && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return { success: true, role: foundUser.role };
    } else {
      return { success: false, message: "Invalid credentials" };
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
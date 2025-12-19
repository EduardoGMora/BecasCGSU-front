import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Custom hook para usar el contexto de autenticación
 * @returns {Object} Contexto de autenticación
 */
export const useAuth = () => useContext(AuthContext);

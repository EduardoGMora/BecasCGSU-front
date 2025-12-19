import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { ROUTES, USER_ROLES, ERROR_MESSAGES } from "../../constants";

/**
 * Login Page Component
 * Handles user authentication and redirects based on role
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = login(email, password);

      if (result.success) {
        // Redirect based on user role
        switch (result.role) {
          case USER_ROLES.ADMIN:
            navigate(ROUTES.ADMIN);
            break;
          case USER_ROLES.SUB_ADMIN:
            navigate(ROUTES.SUB_ADMIN);
            break;
          default:
            navigate(ROUTES.HOME);
        }
      } else {
        setError(result.message || ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(ERROR_MESSAGES.NETWORK_ERROR);
    }
  };


  return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 p-4 font-sans antialiased">
      {/* Container for the portal logo and tagline */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center text-blue-900 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-school"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>
        </div>
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
          Portal de becas UDG
        </h1>
        <p className="mt-2 text-md text-gray-500 max-w-xs md:max-w-md">
          Conoce todas las becas que tenemos para ti.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white p-8 md:p-10 shadow-2xl rounded-2xl border border-gray-100 transition duration-300 hover:shadow-indigo-200/50">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Accede a tu cuenta
        </h2>
        <p className="mt-2 text-md text-gray-500 max-w-xs md:max-w-md text-center  mb-6">
          Accede con tu cuenta de SIIAU.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Codigo
            </label>
            <input
              type="tel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm transition duration-150"
              placeholder="Ej. 217471988"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <a href="#" className="text-xs font-medium text-blue-900 hover:text-indigo-500 transition duration-150">
                Olvidaste tu contraseña?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm transition duration-150"
              placeholder="••••••••"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={"w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white transition duration-300 ease-in-out bg-blue-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transform active:scale-98"}
              >Iniciar sesion
            </button>
          </div>
        </form>

        {/* Signup Link */}

      </div>
    </div>
    // <div className="p-8 max-w-md mx-auto">
    //   <h2 className="text-2xl font-bold mb-4">Login</h2>
    //   {error && <p className="text-red-500">{error}</p>}
    //   <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       className="border p-2 rounded"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       className="border p-2 rounded"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button className="bg-blue-500 text-white p-2 rounded" type="submit">
    //       Login
    //     </button>
    //   </form>
    // </div>
  );
}

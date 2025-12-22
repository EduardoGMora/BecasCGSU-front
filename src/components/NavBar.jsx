import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth';
import PropTypes from 'prop-types';
import { ROUTES } from "../constants";

library.add(fas);

const links = [
    { to: ROUTES.HOME, label: 'Inicio', icon: 'fa-solid fa-home', adminOnly: false, requiresAuth: false },
    { to: ROUTES.SCHOLARSHIPS, label: 'Becas', icon: 'fa-solid fa-award', adminOnly: false, requiresAuth: false },
    { to: ROUTES.CONTACT, label: 'Contacto', icon: 'fa-solid fa-envelope', adminOnly: false, requiresAuth: false },
    { to: ROUTES.MY_APPLICATIONS, label: 'Solicitudes', icon: 'fa-solid fa-file-alt', adminOnly: false, requiresAuth: true },
    { to: ROUTES.ADMIN, label: 'Admin', icon: 'fa-solid fa-cog', adminOnly: true, requiresAuth: true },
    // { to: '/subadmin', label: 'Admin', icon: 'fa-solid fa-cog', adminOnly: true }
];

/**
 * NavBar component to display navigation links
 * @param {Object} props
 * @param {boolean} props.isAdmin - Indica si el usuario es administrador.
 * @param {function} [props.onLinkClick] - Función opcional a ejecutar al hacer clic en un enlace.
 * @param {boolean} [props.mobile] - Indica si la barra de navegación es para vista móvil.
 * @returns {JSX.Element} NavBar component
 */
export const NavBar = ({ isAdmin, onLinkClick, mobile }) => {
    const location = useLocation();
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        if (onLinkClick) onLinkClick();
        navigate('/login');
    };

    const handleLogin = () => {
        if (onLinkClick) onLinkClick();
        navigate('/login');
    };

    return (
        <nav className={mobile ? 'flex flex-col gap-2 pb-4' : 'hidden md:flex items-center gap-4 lg:gap-6'}>
            {links.map(link => {
                // Filtrar por admin
                if (link.adminOnly && !isAdmin) return null;
                if (!link.adminOnly && isAdmin) return null;
                // Filtrar por autenticación
                if (link.requiresAuth && !isAuthenticated) return null;
                const isActive = location.pathname === link.to;
                // console.log(`Link ${link.to} is active:`, isActive);

                return (
                    <Link 
                        key={link.to} 
                        to={link.to}
                        onClick={onLinkClick}
                        className={`${
                            mobile 
                                ? 'flex items-center gap-3 px-4 py-3 rounded-lg transition-all' 
                                : 'px-3 lg:px-4 py-2 rounded-lg font-semibold transition-all'
                        } ${
                            isActive 
                                ? 'text-accent-pink' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-accent-pink'
                        }`}
                        >
                        {mobile && (
                            <FontAwesomeIcon icon={link.icon} className="w-5" />
                        )}
                        <span className={mobile ? 'font-semibold' : ''}>
                            {link.label}
                        </span>
                    </Link>
                );
            })}
            
            {/* Login Button - Solo cuando NO está autenticado */}
            {!isAuthenticated && (
                mobile ? (
                    <button
                        onClick={handleLogin}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-blue-900 text-white hover:bg-blue-800"
                    >
                        <FontAwesomeIcon icon="fa-solid fa-sign-in-alt" className="w-5" />
                        <span className="font-semibold">Iniciar sesión</span>
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="px-4 py-2 rounded-lg font-semibold transition-all bg-accent-pink text-white hover:bg-accent-magenta"
                        aria-label="Iniciar sesión"
                        title="Iniciar sesión"
                    >
                        Iniciar sesión
                    </button>
                )
            )}

            {/* Logout Button - Solo cuando está autenticado */}
            {isAuthenticated && (
                mobile ? (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-600 hover:bg-red-50 hover:text-red-600"
                    >
                        <FontAwesomeIcon icon="fa-solid fa-sign-out-alt" className="w-5" />
                        <span className="font-semibold">Cerrar sesión</span>
                    </button>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all"
                        aria-label="Cerrar sesión"
                        title="Cerrar sesión"
                    >
                        <FontAwesomeIcon 
                            icon="fa-solid fa-sign-out-alt" 
                            className="text-xl"
                        />
                    </button>
                )
            )}
        </nav>
    );
}

NavBar.propTypes = {
  isAdmin: PropTypes.bool,
  onLinkClick: PropTypes.func,
  mobile: PropTypes.bool,
};

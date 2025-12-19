import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth';
import PropTypes from 'prop-types';

library.add(fas);

const links = [
    { to: '/', label: 'Inicio', icon: 'fa-solid fa-home',adminOnly:false },
    { to: '/becas', label: 'Becas', icon: 'fa-solid fa-award',adminOnly:false },
    { to: '/contacto', label: 'Contacto', icon: 'fa-solid fa-envelope',adminOnly:false },
    // { to: '/mis-solicitudes', label: 'Solicitudes', icon: 'fa-solid fa-file-alt',adminOnly:false },
    { to: '/admin', label: 'Admin', icon: 'fa-solid fa-cog', adminOnly: true },
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
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        if (onLinkClick) onLinkClick();
        navigate('/login');
    };

    return (
        <nav className={mobile ? 'flex flex-col gap-2 pb-4' : 'hidden md:flex items-center gap-4 lg:gap-6'}>
            {links.map(link => {
                if (link.adminOnly && !isAdmin) return null;
                if (!link.adminOnly && isAdmin) return null;
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
                                ? 'bg-blue-900 text-white' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-blue-900'
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
            
            {/* Logout Button */}
            {mobile ? (
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
            )}
        </nav>
    );
}

NavBar.propTypes = {
  isAdmin: PropTypes.bool,
  onLinkClick: PropTypes.func,
  mobile: PropTypes.bool,
};

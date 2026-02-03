import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth';
import PropTypes from 'prop-types';
import { ROUTES } from "../constants";
import { useEffect, useState } from 'react';

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
export const NavBar = ({ isAdmin, onLinkClick, mobile, onSelectOption, optionSelected, id }) => {
    const [permissions, setPermissions] = useState([]);
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)

    const handleLogin = () => {
        if (onLinkClick) onLinkClick();
        navigate('/login');
    };

    useEffect(() => {
    if(isAuthenticated  === true){
        const fetchPermisions = async () => {
            try {
            const response = await fetch(
                `http://localhost:8000/user-permissions/user/${id}`
            );
            const result = await response.json();

            if (result.status === "success") {
                const permissionNames = result.data
                .filter(p => p.allowed)
                .map(p => p.permissions.nombre);

                // 👇 AQUÍ se guarda en el useState
                setPermissions(permissionNames);

                console.log("Permisos guardados:", permissionNames);
                onSelectOption(permissionNames[0])
            }
            } catch (error) {
            console.error("Error al cargar permisos:", error);
            }
        };
        if(isAdmin != "admin"){
        fetchPermisions();
        }else{
            onSelectOption("overview")
        }
    }
    }, [id]);
    function ButtonOverview() {
    return (
        <button
            onClick={() => onSelectOption('overview')}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                optionSelected === 'overview'
                ? 'bg-blue-900 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
            >
            <i className="fas fa-chart-line mr-2"></i>Resumen
        </button>
    )
    }
    function ButtonScholarships() {
    return (
        <button
        onClick={() => onSelectOption('scholarships')}
        className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            optionSelected === 'scholarships'
            ? 'bg-blue-900 text-white'
            : 'bg-white border border-gray-300 hover:bg-gray-50'
        }`}
        >
        <i className="fas fa-award mr-2"></i>Gestión de Becas
        </button>
    )
    }
    function ButtonApplications() {
    return (
        <button
        onClick={() => onSelectOption('applications')}
        className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            optionSelected === 'applications'
            ? 'bg-blue-900 text-white'
            : 'bg-white border border-gray-300 hover:bg-gray-50'
        }`}
        >
        <i className="fas fa-file-alt mr-2"></i>Solicitudes
        </button>
    )
    }
    function ButtonUsers() {
    return (
        <button
        onClick={() => onSelectOption('users')}
        className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            optionSelected === 'users'
            ? 'bg-blue-900 text-white'
            : 'bg-white border border-gray-300 hover:bg-gray-50'
        }`}
        >
        <i className="fas fa-users mr-2"></i>Usuarios
        </button>
    )
    }
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
            {isAdmin == "student" && links.map(link => {
                if (link.adminOnly && isAdmin =="student") return null;
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
            {isAdmin == "admin" && (
                <>
                <ButtonOverview></ButtonOverview>
                <ButtonScholarships></ButtonScholarships>
                <ButtonApplications></ButtonApplications>
                <ButtonUsers></ButtonUsers>
                </>
               
            )}
            {isAdmin === "subadmin" && (
                <>
                    {permissions.includes("overview") && <ButtonOverview />}
                    {permissions.includes("scholarships") && <ButtonScholarships />}
                    {permissions.includes("applications") && <ButtonApplications />}                
                    {permissions.includes("users") && <ButtonUsers />}
                </>
            )}
            
            {/* Logout Button */}
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
            { console.log(isAuthenticated)}
            {isAuthenticated  && (
                mobile ? (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-600 hover:bg-red-50 hover:text-red-600"
                    >                        {console.log("qpd")}
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



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom'

library.add(fas);

const links = [
    { to: '/', label: 'Inicio', icon: 'fa-solid fa-home',adminOnly:false },
    { to: '/becas', label: 'Becas', icon: 'fa-solid fa-award',adminOnly:false },
    { to: '/mis-solicitudes', label: 'Solicitudes', icon: 'fa-solid fa-file-alt',adminOnly:false },
    { to: '/contacto', label: 'Contacto', icon: 'fa-solid fa-envelope',adminOnly:false },
    { to: '/admin', label: 'Admin', icon: 'fa-solid fa-cog', adminOnly: true }
];

export const NavBar = ({ isAdmin, onLinkClick, mobile, onSelectOption, optionSelected }) => {
    const location = useLocation();

    // Debug: Check what pathname we're getting

    return (
        <nav className={mobile ? 'flex flex-col gap-2 pb-4' : 'hidden md:flex items-center gap-4 lg:gap-6'}>
            {isAdmin == "student" && links.map(link => {
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
            {isAdmin == "admin" && (
                <>
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
                </>
            )}
        </nav>
    );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom'

library.add(fas);

const links = [
    { to: '/', label: 'Inicio', icon: 'fa-solid fa-home' },
    { to: '/becas', label: 'Becas', icon: 'fa-solid fa-award' },
    { to: '/mis-solicitudes', label: 'Solicitudes', icon: 'fa-solid fa-file-alt' },
    { to: '/contacto', label: 'Contacto', icon: 'fa-solid fa-envelope' },
    { to: '/admin', label: 'Admin', icon: 'fa-solid fa-cog', adminOnly: true }
];

export const NavBar = ({ isAdmin, onLinkClick, mobile }) => {
    const location = useLocation();

    // Debug: Check what pathname we're getting

    return (
        <nav className={mobile ? 'flex flex-col gap-2 pb-4' : 'hidden md:flex items-center gap-4 lg:gap-6 items-center gap-6'}>
            {links.map(link => {
                if (link.adminOnly && !isAdmin) return null;

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
        </nav>
    );
}

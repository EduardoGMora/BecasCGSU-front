import { Link, useLocation } from 'react-router-dom'

const links = [
    { to: '/', label: 'Inicio' },
    { to: '/becas', label: 'Becas Disponibles' },
    { to: '/mis-solicitudes', label: 'Mis Solicitudes' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/admin', label: 'Admin', adminOnly: true }
]

export const NavBar = ({ isAdmin }) => {
    const location = useLocation();

    return (
        <nav className='flex items-center gap-6'>
            {links.map(link => {
                if (link.adminOnly && !isAdmin) return null;
                return (
                    <Link key={link.to} to={link.to}>
                        <button
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            location.pathname === link.to ? 'bg-gray-200 text-blue-900' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {link.label}
                        </button>
                    </Link>
                );
            })}
        </nav>
    );
}

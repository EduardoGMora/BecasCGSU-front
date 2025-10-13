import { useState} from 'react';
import { Link } from 'react-router-dom'

const links = [
    { to: '/', label: 'Inicio' },
    { to: '/becas', label: 'Becas Disponibles' },
    { to: '/mis-solicitudes', label: 'Mis Solicitudes' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/admin', label: 'Admin', adminOnly: true }
]

export const NavBar = ({ isAdmin }) => {
    const [currentPage, setCurrentPage] = useState('Inicio'); // 'home', 'scholarships', 'applications', 'contact', 'admin'

    return (
        <nav className='flex items-center gap-6'>
            {links.map(link => {
                if (link.adminOnly && !isAdmin) return null;
                return (
                    <Link to={link.to}>
                        <button
                            onClick={() => setCurrentPage(link.label)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            currentPage === link.label ? 'bg-gray-200 text-blue-900' : 'text-gray-600 hover:bg-gray-100'
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

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export function Header({ isAdmin }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        return null;
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="text-lg sm:text-xl font-bold text-blue-900 flex items-center gap-2 hover:text-blue-700 transition-colors"
                        onClick={closeMenu}
                    >
                        <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
                        <span className="hidden sm:inline">Universidad de Guadalajara</span>
                        <span className="sm:hidden">UdeG</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-4 lg:gap-6">
                        <NavLinks isAdmin={isAdmin} onLinkClick={closeMenu} />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-gray-600 hover:text-blue-900 hover:bg-gray-100 rounded-lg transition-all"
                        aria-label="Toggle menu"
                    >
                        <FontAwesomeIcon 
                            icon={isMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'} 
                            className="text-xl"
                        />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                        isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                >
                    <nav className="flex flex-col gap-2 pb-4">
                        <NavLinks isAdmin={isAdmin} onLinkClick={closeMenu} mobile />
                    </nav>
                </div>
            </div>
        </header>
    );
}

function NavLinks({ isAdmin, onLinkClick, mobile = false }) {
    const links = [
        { to: '/', label: 'Inicio', icon: 'fa-solid fa-home' },
        { to: '/becas', label: 'Becas', icon: 'fa-solid fa-award' },
        { to: '/mis-solicitudes', label: 'Solicitudes', icon: 'fa-solid fa-file-alt' },
        { to: '/contacto', label: 'Contacto', icon: 'fa-solid fa-envelope' },
        { to: '/admin', label: 'Admin', icon: 'fa-solid fa-cog', adminOnly: true }
    ];

    return (
        <>
            {links.map(link => {
                if (link.adminOnly && !isAdmin) return null;
                
                const isActive = window.location.pathname === link.to;
                
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
        </>
    );
}
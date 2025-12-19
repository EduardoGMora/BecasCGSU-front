import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { NavBar } from './NavBar';
import pub_logo from '../assets/PUB.svg';

library.add(fas);

/**
 * 
 * @param {Object} props
 * @param {string} props.role - User role to determine navigation options
 * @returns {JSX.Element} Header component
 */

export function Header({ role }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isAdmin = role === 'admin' || role === 'subadmin';

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
                        onClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                        <img src={pub_logo} alt="Logo de la Universidad de Guadalajara" className="h-24" />
                    </Link>

                    {/* Desktop Navigation */}
                    <NavBar isAdmin={isAdmin} onLinkClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} mobile={false}/>

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
                    <NavBar isAdmin={isAdmin} onLinkClick={() => { closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} mobile />
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
  role: PropTypes.string,
};
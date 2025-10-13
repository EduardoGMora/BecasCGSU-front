import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import { NavBar } from './NavBar'

export function Header({ isAdmin }) {

    if ( window.location.pathname === '/login' || window.location.pathname === '/register' ) {
        return null;
    }

    return (
        <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <button className="text-xl font-bold text-blue-900 flex items-center gap-2">
                        <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
                        <Link to="/">Universidad de Guadalajara</Link>
                </button>

                <NavBar isAdmin={isAdmin} />
            </div>
        </header>
    );
}
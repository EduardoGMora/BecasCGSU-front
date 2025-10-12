import {} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

export function Header() {
    if ( window.location.pathname === '/login' || window.location.pathname === '/register' ) {
        return null;
    }

    /* Render links depending on user role */
    /*{isLoggedIn = true; userRole = 'admin'; Example values }*/
    // const isLoggedIn = true;
    // const userRole = 'admin';

    return (
        <header className="header">
            <div className="header-container">
                <a href="/"><h1>Becas CGSU</h1></a>
                <nav className="nav">
                    <a className="nav-link" href="/">Inicio</a>
                    <a className="nav-link" href="/becas">Becas Disponibles</a>
                    <a className="nav-link" href="/mis-solicitudes">Mis Solicitudes</a>
                    <a className="nav-link" href="/contact">Contacto</a>
                    <a href="/login">
                        <FontAwesomeIcon icon="fa-solid fa-user-cog" />
                    </a>
                </nav>
            </div>
        </header>
    );

}
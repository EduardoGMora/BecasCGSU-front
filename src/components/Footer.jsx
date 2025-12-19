import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import pub_logo from '../assets/PUB.svg';

/**
 * Footer component for the application
 * @returns {JSX.Element} Footer component
 */
export function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    const quickLinks = [
        { to: '/', label: 'Inicio' },
        { to: '/becas', label: 'Becas' },
        { to: '/mis-solicitudes', label: 'Mis Solicitudes' },
        { to: '/contacto', label: 'Contacto' }
    ];

    const socialLinks = [
        { icon: faFacebook, url: '#', label: 'Facebook' },
        { icon: faXTwitter, url: '#', label: 'Twitter' },
        { icon: faInstagram, url: '#', label: 'Instagram' },
        { icon: faLinkedin, url: '#', label: 'LinkedIn' }
    ];

    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 items-center">
                    {/* About Section */}
                    <div className="space-y-4 text-center">
                        <Link 
                            to="/" 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >   
                            <img src={pub_logo} alt="Logo de la Universidad de Guadalajara" className="max-w-xs mx-auto"/>
                        </Link>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Portal oficial de becas de la Universidad de Guadalajara. 
                            Apoyando el desarrollo académico de nuestros estudiantes.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            {quickLinks.map(link => (
                                <li key={link.to}>
                                    <Link 
                                        to={link.to}
                                        className="text-base text-gray-600 hover:text-blue-900 transition-colors flex items-center gap-2"
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" className="text-sm" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Contacto</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <FontAwesomeIcon icon="fa-solid fa-phone" className="text-blue-900 mt-1" />
                                <div className="text-sm">
                                    <p className="text-gray-600">33 3134-2222 <span className="text-gray-500 text-xs">Ext. 12345</span></p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FontAwesomeIcon icon="fa-solid fa-envelope" className="text-blue-900 mt-1" />
                                <a 
                                    href="mailto:becas@udg.mx" 
                                    className="text-sm text-gray-600 hover:text-blue-900 transition-colors break-all"
                                >
                                    becas@udg.mx
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <FontAwesomeIcon icon="fa-solid fa-map-marker-alt" className="text-blue-900 mt-1" />
                                <p className="text-sm text-gray-600">
                                    Av Juárez 976, Col Americana, Americana, 44100 Guadalajara, Jal.
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Horarios y Redes */}
                    <div className="text-center sm:text-left">
                        <h3 className="font-bold text-gray-900 mb-4">Horarios</h3>
                        <div className="space-y-2 mb-6">
                            <p className="text-sm text-gray-600 gap-2">
                                <strong>Lunes - Viernes:</strong> 8:00 AM - 6:00 PM
                            </p>
                            <p className="text-sm text-gray-600 gap-2">
                                <strong>Sábado:</strong> 9:00 AM - 2:00 PM
                            </p>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 mb-4">Síguenos</h3>
                        <div className="flex gap-3 justify-evenly sm:justify-start">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                                    aria-label={social.label}
                                >
                                    <FontAwesomeIcon icon={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600 text-center sm:text-left">
                            &copy; {year} Universidad de Guadalajara. Todos los derechos reservados.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                                Aviso de Privacidad
                            </a>
                            <span className="text-gray-400">|</span>
                            <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                                Términos y Condiciones
                            </a>
                            <span className="text-gray-400 hidden sm:inline">|</span>
                            <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                                Política de Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
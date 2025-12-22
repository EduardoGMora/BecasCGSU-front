import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {usuarios} from "./../utils/users.json"
import { useAuth } from '../context/AuthContext';

library.add(fas);

const links = [
    { to: '/', label: 'Inicio', icon: 'fa-solid fa-home',adminOnly:false },
    { to: '/becas', label: 'Becas', icon: 'fa-solid fa-award',adminOnly:false },
    { to: '/mis-solicitudes', label: 'Solicitudes', icon: 'fa-solid fa-file-alt',adminOnly:false },
    { to: '/contacto', label: 'Contacto', icon: 'fa-solid fa-envelope',adminOnly:false },
    { to: '/admin', label: 'Admin', icon: 'fa-solid fa-cog', adminOnly: true },
    // { to: '/subadmin', label: 'Admin', icon: 'fa-solid fa-cog', adminOnly: true }
];



export const NavBar = ({ isAdmin, onLinkClick, mobile, onSelectOption, optionSelected, id }) => {
    const [permissions, setPermissions] = useState([]);
    useEffect(() => {
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
        }
        } catch (error) {
        console.error("Error al cargar permisos:", error);
        }
    };
    fetchPermisions();
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
    const user = usuarios.find(u => u.id === id);
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
                    {permissions.includes("dashboard") && <ButtonOverview />}
                    {permissions.includes("becarios") && <ButtonScholarships />}
                    {permissions.includes("solicitudes") && <ButtonApplications />}                
                    {permissions.includes("usuarios") && <ButtonUsers />}
                </>
            )}
            
            {/* Logout Button */}
            {mobile ? (
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
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
            )}
        </nav>
    );
}

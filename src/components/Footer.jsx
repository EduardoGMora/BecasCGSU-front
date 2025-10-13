import {} from 'react';

// Componente Footer
export function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
    <footer className="text-center py-8 border-t border-gray-200 bg-white text-gray-600">
        <p>&copy; {year} Universidad de Guadalajara. Todos los derechos reservados.</p>
        <p className="mt-1">Portal de Becas - Sistema de Gestión Integral</p>
    </footer>
    );
}
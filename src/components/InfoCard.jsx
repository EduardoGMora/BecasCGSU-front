import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 * InfoCard component to display an information card with an icon, title, and optional children
 * @param {Object} props
 * @param {string} props.icon - Icono de FontAwesome a mostrar en la tarjeta.
 * @param {string} props.title - Título de la tarjeta.
 * @param {React.ReactNode} props.children - Contenido adicional dentro de la tarjeta.
 * @returns {JSX.Element} InfoCard component
 */
export const InfoCard = ({icon, title, children}) => {
    return(
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={icon} className="text-blue-900 text-xl" />            
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-900">{title}</h3>
            </div>
            {children}
        </div>
    );
}

InfoCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
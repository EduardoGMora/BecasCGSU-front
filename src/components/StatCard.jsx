import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 * 
 * @param {Object} props
 * @param {string} props.icon - Icono a mostrar.
 * @param {string|number} props.number - Número a mostrar.
 * @param {string} props.label - Etiqueta descriptiva.
 * @returns {JSX.Element} StatCard component
 */
export const StatCard = ({ icon, number, label }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:transform hover:-translate-y-1 transition-all text-center">
      <div className="text-4xl text-blue-900 mb-4">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="text-3xl font-bold text-blue-900 mb-2">{number}</div>
      <div className="text-gray-600 font-semibold">{label}</div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};
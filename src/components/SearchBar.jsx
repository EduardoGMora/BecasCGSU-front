import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 * SearchBar component for searching scholarships
 * @param {Object} props
 * @param {string} props.searchTerm - Término de búsqueda actual.
 * @param {function} props.onSearchChange - Función para manejar cambios en el término de búsqueda.
 * @param {function} props.onSearch - Función para ejecutar la búsqueda.
 * @returns {JSX.Element} SearchBar component
 */
export const SearchBar = ({ searchTerm, onSearchChange, onSearch }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Buscar becas..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        className="flex-1 px-5 py-3 rounded-lg text-gray-900"
      />
      <button 
        onClick={onSearch}
        className="px-6 py-3 bg-blue-800 hover:bg-blue-950 rounded-lg font-semibold transition-all"
      >
        <FontAwesomeIcon icon="fa-solid fa-search" className="mr-2" />
        Buscar
      </button>
    </>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

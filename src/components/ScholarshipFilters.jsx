import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 * ScholarshipFilters component to display and manage scholarship filters
 * @param {Object} props
 * @param {Object} props.filterState - Estado actual de los filtros.
 * @param {Array} props.scholarshipTypes - Lista de tipos de beca disponibles.
 * @param {Array} props.universityCenters - Lista de centros universitarios disponibles.
 * @param {function} props.onFilterChange - Función para manejar cambios en los filtros.
 * @param {function} props.onApply - Función para aplicar los filtros.
 * @param {function} props.onClear - Función para limpiar los filtros.
 * @param {boolean} [props.loading=false] - Indica si los datos están cargando.
 * @returns {JSX.Element} ScholarshipFilters component
 */
export const ScholarshipFilters = ({ 
  filterState, 
  scholarshipTypes, 
  universityCenters,
  onFilterChange,
  onApply,
  onClear,
  loading = false
}) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h3 className="text-xl font-bold text-[#BF51D8] mb-4">
        <FontAwesomeIcon icon="fa-solid fa-filter" className="mr-2" iconColor="text-[#BF51D8]" />
        Filtros de Búsqueda
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end ">
        <div>
          <label className="block font-semibold mb-2 text-[#BF51D8]">Estado</label>
          <select 
            name="status" 
            value={filterState.status || "Todas"} 
            onChange={onFilterChange} 
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="Todas">{loading ? 'Cargando...' : 'Todas'}</option>
            <option value="open">Abierta</option>
            <option value="Cerrada">Cerrada</option>
          </select>
        </div>
        
        <div>
          <label className="block font-semibold mb-2 text-[#BF51D8]">Tipo de Beca</label>
          <select 
            name="scholarship_type_id" 
            value={filterState.scholarship_type_id || "Todas"} 
            onChange={onFilterChange} 
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="Todas">{loading ? 'Cargando...' : 'Todas'}</option>
            {scholarshipTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name || type.type_name || `Tipo ${type.id}`}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block font-semibold mb-2 text-[#BF51D8]">Centro Universitario</label>
          <select 
            name="university_center_id" 
            value={filterState.university_center_id || "Todas"} 
            onChange={onFilterChange} 
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="Todas">{loading ? 'Cargando...' : 'Todas'}</option>
            {universityCenters.map((center) => (
              <option key={center.id} value={center.id}>
                {center.name || center.center_name || `Centro ${center.id}`}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={onClear} 
          className="px-5 py-2 border border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-all"
        >
          Limpiar
        </button>
        
        <button 
          onClick={onApply} 
          disabled={loading}
          className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Aplicar
        </button>
      </div>
    </section>
  );
};

ScholarshipFilters.propTypes = {
  filterState: PropTypes.shape({
    status: PropTypes.string,
    category: PropTypes.string,
    university_center: PropTypes.string,
  }).isRequired,
  scholarshipTypes: PropTypes.arrayOf(PropTypes.string),
  universityCenters: PropTypes.arrayOf(PropTypes.string),
  onFilterChange: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

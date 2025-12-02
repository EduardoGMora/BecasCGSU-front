import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <h3 className="text-xl font-bold text-blue-900 mb-4">
        <FontAwesomeIcon icon="fa-solid fa-filter" className="mr-2" />
        Filtros de Búsqueda
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block font-semibold mb-2">Estado</label>
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
          <label className="block font-semibold mb-2">Tipo de Beca</label>
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
          <label className="block font-semibold mb-2">Centro Universitario</label>
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

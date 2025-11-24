import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ScholarshipCard } from '../components/ScholarShipCard';
import { HeroCard } from '../components/HeroCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Scholarships from '../utils/scholarships.json';

// ScholarshipsPage
export function ScholarshipsPage({ onApply }) {
  const { handleApply } = useOutletContext();
  const [viewType, setViewType] = useState('grid');
  
  const [filterState, setFilterState] = useState({
    type: "Todas",
    area: "Todas",
    institution: "Todas",
    amountRange: "Cualquier monto",
  });

  const [filteredScholarships, setFilteredScholarships] =
    useState(Scholarships);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const parseAmount = (amountStr) => {
    return Number(amountStr.replace(/[^0-9.-]+/g, ""));
  };

  const applyFilters = () => {
    const result = Scholarships.filter((item) => {
      const matchType =
        filterState.type === "Todas" || item.type === filterState.type;

      const matchArea =
        filterState.area === "Todas" || item.area === filterState.area;

      const matchInst =
        filterState.institution === "Todas" ||
        item.institution === filterState.institution;

      let matchAmount = true;
      const amountNum = parseAmount(item.amount);

      if (filterState.amountRange === "$10,000 - $25,000") {
        matchAmount = amountNum >= 10000 && amountNum <= 25000;
      } else if (filterState.amountRange === "$25,000 - $50,000") {
        matchAmount = amountNum > 25000 && amountNum <= 50000;
      }

      return matchType && matchArea && matchInst && matchAmount;
    });
    setFilteredScholarships(result);
  };

  const clearFilters = () => {
    setFilterState({
      type: "Todas",
      area: "Todas",
      institution: "Todas",
      amountRange: "Cualquier monto",
    });
    setFilteredScholarships(Scholarships);
  };

  return (
    <div className="pt-20">
      <HeroCard 
        title="Becas Disponibles"
        subtitle="Explora todas las oportunidades de financiamiento disponibles para tu educación."
      >
        <input
            type="text"
            placeholder="Buscar becas..."
            className="flex-1 px-5 py-3 rounded-lg text-gray-900"
          />
          <button className="px-6 py-3 bg-blue-800 hover:bg-blue-950 rounded-lg font-semibold transition-all">
            <FontAwesomeIcon icon="fa-solid fa-search" className="mr-2" />Buscar
          </button>
      </HeroCard>

      <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          <FontAwesomeIcon icon="fa-solid fa-filter" className="mr-2" />Filtros de Búsqueda
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
          <div>
            <label className="block font-semibold mb-2">Tipo de Beca</label>
            <select name="type" value={filterState.type} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" >
              <option>Todas</option>
              <option>Excelencia Académica</option>
              <option>Necesidad Económica</option>
              <option>Deportiva</option>
              <option>Innovación Tecnológica</option>
              <option>Investigación Científica</option>
              <option>Intercambio</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Área de Estudio</label>
            <select name="area" value={filterState.area} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" >
              <option>Todas</option>
              <option>Ingeniería</option>
              <option>Ciencias de la Salud</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Institución</label>
            <select name="institution" value={filterState.institution} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" >
              <option value="Todas">Todas</option>
              <option value="Universidad de Guadalajara">Universidad de Guadalajara</option>
              <option value="Fundación Telmex">Fundación Telmex</option>
              <option value="Google México">Google México</option>
              <option value="CONACyT">CONACyT</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Monto Mínimo</label>
            <select name="amountRange" value={filterState.amountRange} onChange={handleFilterChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" >
              <option>Cualquier monto</option>
              <option>$10,000 - $25,000</option>
              <option>$25,000 - $50,000</option>
            </select>
          </div>
          <button onClick={clearFilters} className="px-5 py-2 border border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-all">
            Limpiar
          </button> 
          <button onClick={applyFilters} className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all">
            Aplicar
          </button>
        </div>
      </section>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">
          {filteredScholarships.length} Becas Encontradas
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 border rounded-lg transition-all ${
              viewType === "grid"
                ? "bg-blue-900 text-white border-blue-900"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon="fa-solid fa-grid" />
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`p-2 border rounded-lg transition-all ${
              viewType === "list"
                ? "bg-blue-900 text-white border-blue-900"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon="fa-solid fa-list" />
          </button>
        </div>
      </div>

      <div
        className={
          viewType === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredScholarships.map(scholarship => (  
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} onApply={handleApply}  />
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ScholarshipCard } from '../components/ScholarShipCard';

// ScholarshipsPage
export function ScholarshipsPage({ onApply }) {
  const [viewType, setViewType] = useState('grid');
  
  const scholarships = [
    {
      id: 1,
      title: 'Beca de Excelencia Académica 2025',
      institution: 'Universidad de Guadalajara',
      deadline: '15 de Diciembre, 2025',
      beneficiaries: 50,
      description: 'Beca dirigida a estudiantes con promedio superior a 9.5. Cubre 100% de colegiatura y gastos de manutención mensual.',
      amount: '$50,000 MXN',
      status: 'open'
    },
    {
      id: 2,
      title: 'Programa de Apoyo Socioeconómico',
      institution: 'Fundación Telmex',
      deadline: '20 de Diciembre, 2025',
      beneficiaries: 200,
      description: 'Apoyo financiero para estudiantes con comprobada necesidad económica y buen rendimiento académico (promedio mínimo 8.0).',
      amount: '$25,000 MXN',
      status: 'open'
    },
    {
      id: 3,
      title: 'Beca de Innovación Tecnológica',
      institution: 'Google México',
      deadline: '10 de Enero, 2026',
      beneficiaries: 25,
      description: 'Programa exclusivo para estudiantes de ingeniería en sistemas con proyectos innovadores y potencial de impacto social.',
      amount: '$75,000 MXN',
      status: 'open'
    },
    {
      id: 4,
      title: 'Beca Deportiva de Alto Rendimiento',
      institution: 'Universidad de Guadalajara',
      deadline: '5 de Enero, 2026',
      beneficiaries: 30,
      description: 'Dirigida a deportistas destacados en disciplinas olímpicas con representación nacional o internacional.',
      amount: '$40,000 MXN',
      status: 'open'
    },
    {
      id: 5,
      title: 'Programa de Investigación Científica',
      institution: 'CONACyT',
      deadline: '25 de Enero, 2026',
      beneficiaries: 15,
      description: 'Beca para estudiantes de posgrado con proyectos de investigación en ciencias exactas y naturales.',
      amount: '$120,000 MXN',
      status: 'open'
    },
    {
      id: 6,
      title: 'Beca de Intercambio Internacional',
      institution: 'Fundación BBVA',
      deadline: '31 de Octubre, 2025',
      beneficiaries: 10,
      description: 'Programa de movilidad estudiantil para realizar un semestre en universidades europeas de prestigio.',
      amount: '$200,000 MXN',
      status: 'closed'
    }
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg px-8 py-16 md:px-16 mb-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Becas Disponibles</h1>
        <p className="text-xl mb-6 opacity-90">Explora todas las oportunidades de financiamiento disponibles</p>
        <div className="flex gap-4 max-w-2xl mx-auto mt-6 flex-col md:flex-row">
          <input
            type="text"
            placeholder="Buscar becas..."
            className="flex-1 px-5 py-3 rounded-lg text-gray-900"
          />
          <button className="px-6 py-3 bg-blue-800 hover:bg-blue-950 rounded-lg font-semibold transition-all">
            <i className="fas fa-search mr-2"></i>Buscar
          </button>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          <i className="fas fa-filter mr-2"></i>Filtros de Búsqueda
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
          <div>
            <label className="block font-semibold mb-2">Tipo de Beca</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Todas</option>
              <option>Excelencia Académica</option>
              <option>Necesidad Económica</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Área de Estudio</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Todas</option>
              <option>Ingeniería</option>
              <option>Ciencias de la Salud</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Institución</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Todas</option>
              <option>Universidad de Guadalajara</option>
              <option>Fundación Telmex</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Monto Mínimo</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Cualquier monto</option>
              <option>$10,000 - $25,000</option>
              <option>$25,000 - $50,000</option>
            </select>
          </div>
          <button className="px-5 py-2 border border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-all">
            Limpiar
          </button>
          <button className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all">
            Aplicar
          </button>
        </div>
      </section>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">127 Becas Encontradas</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('grid')}
            className={`p-2 border rounded-lg transition-all ${
              viewType === 'grid' 
                ? 'bg-blue-900 text-white border-blue-900' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-th"></i>
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`p-2 border rounded-lg transition-all ${
              viewType === 'list' 
                ? 'bg-blue-900 text-white border-blue-900' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-list"></i>
          </button>
        </div>
      </div>

      <div className={viewType === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {scholarships.map(scholarship => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} onApply={onApply} />
        ))}
      </div>
    </div>
  );
};
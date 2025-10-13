import {} from 'react';

// Componente ScholarshipCard
export const ScholarshipCard = ({ scholarship, onApply }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:transform hover:-translate-y-1 transition-all border-l-4 ${
      scholarship.status === 'open' ? 'border-blue-900' : 'border-red-500 opacity-70'
    }`}>
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-900 mb-3">{scholarship.title}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className={`fas ${scholarship.institution === 'Universidad de Guadalajara' ? 'fa-university' : 'fa-building'} w-4 text-blue-900`}></i>
              <span>{scholarship.institution}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-calendar w-4 text-blue-900"></i>
              <span>Fecha límite: {scholarship.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-users w-4 text-blue-900"></i>
              <span>{scholarship.beneficiaries} beneficiarios</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
          scholarship.status === 'open' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {scholarship.status === 'open' ? 'Abierta' : 'Cerrada'}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4">{scholarship.description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold text-green-600">{scholarship.amount}</span>
        <button
          onClick={() => onApply(scholarship)}
          disabled={scholarship.status !== 'open'}
          className={`px-5 py-2 rounded-lg font-semibold transition-all ${
            scholarship.status === 'open'
              ? 'bg-blue-900 text-white hover:bg-blue-800 hover:transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {scholarship.status === 'open' ? 'Aplicar' : 'Ver Detalles'}
        </button>
      </div>
    </div>
  );
};
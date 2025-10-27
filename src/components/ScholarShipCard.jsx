import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ScholarshipCard = ({ scholarship, onApply }) => {
  return (
    <div 
      className={`bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 ${
        scholarship.status === 'open' ? 'border-blue-900' : 'border-red-500 opacity-70'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
        <div className="flex-1 w-full">
          <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 line-clamp-2">
            {scholarship.title}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FontAwesomeIcon 
                icon={scholarship.institution === 'Universidad de Guadalajara' ? 'fa-solid fa-university' : 'fa-solid fa-building'} 
                className="w-4 text-blue-900 flex-shrink-0"
              />
              <span className="truncate">{scholarship.institution}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="w-4 text-blue-900 flex-shrink-0" />
              <span className="truncate">Límite: {scholarship.deadline}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FontAwesomeIcon icon="fa-solid fa-users" className="w-4 text-blue-900 flex-shrink-0" />
              <span>{scholarship.beneficiaries} beneficiarios</span>
            </div>
          </div>
        </div>
        
        <span 
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap self-start sm:self-auto ${
            scholarship.status === 'open' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          {scholarship.status === 'open' ? 'Abierta' : 'Cerrada'}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-3">
        {scholarship.description}
      </p>
      
      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-auto pt-4 border-t border-gray-100">
        <span className="text-xl sm:text-2xl font-bold text-green-600">
          {scholarship.amount}
        </span>
        
        <button
          onClick={() => onApply(scholarship)}
          disabled={scholarship.status !== 'open'}
          className={`w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base ${
            scholarship.status === 'open'
              ? 'bg-blue-900 text-white hover:bg-blue-800 active:scale-95'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {scholarship.status === 'open' ? (
            <>
              <FontAwesomeIcon icon="fa-solid fa-paper-plane" className="mr-2" />
              Aplicar
            </>
          ) : (
            'Ver Detalles'
          )}
        </button>
      </div>
    </div>
  );
};
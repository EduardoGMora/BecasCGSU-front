import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ScholarshipDetail = ({ scholarship, onClose, onApply }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-blue-900">{scholarship.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon="fa-solid fa-times" className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <FontAwesomeIcon 
                icon={scholarship.institution === 'Universidad de Guadalajara' ? 'fa-solid fa-university' : 'fa-solid fa-building'} 
                className="w-5 text-blue-900"
              />
              <span className="text-lg">{scholarship.institution}</span>
            </div>
            
            <div className="flex items-center gap-3 text-gray-600">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className="w-5 text-blue-900" />
              <span className="text-lg">Fecha límite: {scholarship.deadline}</span>
            </div>
            
            <div className="flex items-center gap-3 text-gray-600">
              <FontAwesomeIcon icon="fa-solid fa-users" className="w-5 text-blue-900" />
              <span className="text-lg">{scholarship.beneficiaries} beneficiarios</span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <FontAwesomeIcon icon="fa-solid fa-money-bill" className="w-5 text-blue-900" />
              <span className="text-xl font-bold text-green-600">{scholarship.amount}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Descripción</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {scholarship.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Requisitos</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {scholarship.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {scholarship.documents && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Documentos Requeridos</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {scholarship.documents.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              scholarship.status === 'open' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {scholarship.status === 'open' ? 'Abierta' : 'Cerrada'}
            </span>
            
            <button
              onClick={() => onApply(scholarship)}
              disabled={scholarship.status !== 'open'}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                scholarship.status === 'open'
                  ? 'bg-blue-900 text-white hover:bg-blue-800 active:scale-95'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {scholarship.status === 'open' ? (
                <>
                  <FontAwesomeIcon icon="fa-solid fa-paper-plane" className="mr-2" />
                  Aplicar ahora
                </>
              ) : (
                'Convocatoria Cerrada'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
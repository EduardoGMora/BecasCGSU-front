import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ScholarshipDetails = ({ scholarship, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Detalles de la Beca</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FontAwesomeIcon icon="fa-solid fa-times" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6">
            {/* Información básica */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Información General</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Nombre:</span>
                  <span className="font-medium flex-1">{scholarship.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Institución:</span>
                  <span className="font-medium flex-1">{scholarship.institution}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Tipo:</span>
                  <span className="font-medium flex-1">{scholarship.type}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Monto:</span>
                  <span className="font-medium text-green-600">{scholarship.amount}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Estado:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex ${
                    scholarship.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {scholarship.status === 'active' ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
              </div>
            </div>

            {/* Requisitos */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Requisitos</h3>
              <div className="space-y-3">
                {scholarship.requirements?.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon="fa-solid fa-check" className="text-green-500" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentación requerida */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Documentación Requerida</h3>
              <div className="space-y-3">
                {scholarship.requiredDocuments?.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon="fa-solid fa-file" className="text-blue-900" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fechas importantes */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Fechas Importantes</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Inicio:</span>
                  <span className="font-medium">{scholarship.startDate}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Cierre:</span>
                  <span className="font-medium">{scholarship.endDate}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Resultados:</span>
                  <span className="font-medium">{scholarship.resultsDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
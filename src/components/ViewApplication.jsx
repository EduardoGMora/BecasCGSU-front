import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ViewApplication = ({ application, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">Detalles de la Solicitud</h2>
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
            {/* Información del solicitante */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Información del Solicitante</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Nombre:</span>
                  <span className="font-medium flex-1">{application.name}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Email:</span>
                  <span className="font-medium flex-1">{application.email}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Código:</span>
                  <span className="font-medium flex-1">{application.studentId}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Carrera:</span>
                  <span className="font-medium flex-1">{application.major}</span>
                </div>
              </div>
            </div>

            {/* Información de la beca */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Información de la Beca</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Beca:</span>
                  <span className="font-medium flex-1">{application.scholarship}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Tipo:</span>
                  <span className="font-medium flex-1">{application.type}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Monto:</span>
                  <span className="font-medium text-green-600">{application.amount}</span>
                </div>
              </div>
            </div>

            {/* Estado de la solicitud */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Estado de la Solicitud</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Fecha:</span>
                  <span className="font-medium">{application.date}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Estado:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex ${
                    application.status === 'approved' ? 'bg-green-500 text-white' :
                    application.status === 'pending' ? 'bg-yellow-500 text-gray-900' :
                    'bg-red-500 text-white'
                  }`}>
                    {application.status === 'approved' ? 'Aprobada' :
                     application.status === 'pending' ? 'En Proceso' :
                     'Rechazada'}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Puntaje:</span>
                  <span className="font-medium">{application.score}/100</span>
                </div>
              </div>
            </div>

            {/* Documentos */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Documentos Enviados</h3>
              <div className="space-y-3">
                {application.documents?.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon="fa-solid fa-file" className="text-blue-900" />
                      <span>{doc.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FontAwesomeIcon icon="fa-solid fa-download" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FontAwesomeIcon icon="fa-solid fa-eye" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Historial de evaluaciones */}
            {application.evaluations && (
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Historial de Evaluaciones</h3>
                <div className="space-y-4">
                  {application.evaluations.map((evaluation, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold">{evaluation.evaluator}</span>
                          <span className="text-gray-600 text-sm ml-2">{evaluation.date}</span>
                        </div>
                        <span className="font-medium">{evaluation.score}/100</span>
                      </div>
                      <p className="text-gray-700">{evaluation.comments}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
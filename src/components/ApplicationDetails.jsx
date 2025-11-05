import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const ApplicationDetails = ({ application, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
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
            {/* Información de la beca */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Información de la Beca</h3>
              <div className="grid gap-4">
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Nombre:</span>
                  <span className="font-medium flex-1">{application.scholarship}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 w-32">Institución:</span>
                  <span className="font-medium flex-1">{application.institution}</span>
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
              </div>
            </div>

            {/* Documentos */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Documentos Enviados</h3>
              <div className="space-y-3">
                {application.documents?.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FontAwesomeIcon icon="fa-solid fa-file" className="text-blue-900" />
                    <span className="flex-1">{doc.name}</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <FontAwesomeIcon icon="fa-solid fa-download" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Comentarios o retroalimentación */}
            {application.feedback && (
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Retroalimentación</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{application.feedback}</p>
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
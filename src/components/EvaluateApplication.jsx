import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const EvaluateApplication = ({ application, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    score: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      applicationId: application.id,
      date: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">Evaluar Solicitud</h2>
            <button
              type="button"
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
                    <span className="text-gray-600 w-32">Beca:</span>
                    <span className="font-medium flex-1">{application.scholarship}</span>
                  </div>
                </div>
              </div>

              {/* Evaluación */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Evaluación</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Puntaje (0-100)
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="score"
                      min="0"
                      max="100"
                      value={formData.score}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Comentarios
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg min-h-[150px]"
                      required
                      placeholder="Ingrese sus comentarios y observaciones sobre la solicitud..."
                    />
                  </div>
                </div>
              </div>

              {/* Criterios de evaluación */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Criterios de Evaluación</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>90-100: Cumple excepcionalmente con todos los requisitos</li>
                    <li>80-89: Cumple satisfactoriamente con los requisitos</li>
                    <li>70-79: Cumple con la mayoría de los requisitos</li>
                    <li>60-69: Cumple parcialmente con los requisitos</li>
                    <li>&lt;60: No cumple con los requisitos mínimos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar Evaluación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
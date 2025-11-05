import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const EditScholarship = ({ scholarship, onClose, onSave }) => {
  const [formData, setFormData] = useState(scholarship || {
    name: '',
    institution: '',
    type: '',
    amount: '',
    status: 'active',
    requirements: [],
    requiredDocuments: [],
    startDate: '',
    endDate: '',
    resultsDate: ''
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newDocument, setNewDocument] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData(prev => ({
        ...prev,
        requiredDocuments: [...prev.requiredDocuments, newDocument.trim()]
      }));
      setNewDocument('');
    }
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {scholarship ? 'Editar Beca' : 'Nueva Beca'}
            </h2>
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
              {/* Información básica */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Información General</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nombre de la Beca</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Institución</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Tipo de Beca</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">Seleccione un tipo</option>
                      <option value="academic">Excelencia Académica</option>
                      <option value="economic">Apoyo Económico</option>
                      <option value="research">Investigación</option>
                      <option value="sports">Deportiva</option>
                      <option value="cultural">Cultural</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Monto</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Estado</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="active">Activa</option>
                      <option value="inactive">Inactiva</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Requisitos */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Requisitos</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      className="flex-1 p-2 border rounded-lg"
                      placeholder="Nuevo requisito"
                    />
                    <button
                      type="button"
                      onClick={addRequirement}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Agregar
                    </button>
                  </div>
                  {formData.requirements?.map((req, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="flex-1">{req}</span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentación requerida */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Documentación Requerida</h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newDocument}
                      onChange={(e) => setNewDocument(e.target.value)}
                      className="flex-1 p-2 border rounded-lg"
                      placeholder="Nuevo documento"
                    />
                    <button
                      type="button"
                      onClick={addDocument}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Agregar
                    </button>
                  </div>
                  {formData.requiredDocuments?.map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="flex-1">{doc}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fechas */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Fechas Importantes</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Fecha de Inicio</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Fecha de Cierre</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Fecha de Resultados</label>
                    <input
                      type="date"
                      name="resultsDate"
                      value={formData.resultsDate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
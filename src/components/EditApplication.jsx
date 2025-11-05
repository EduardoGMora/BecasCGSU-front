import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';

export const EditApplication = ({ application, onClose, onSave }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    documents: application.documents || [],
    comments: application.comments || '',
  });

  const [newDocument, setNewDocument] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDocument({
        name: file.name,
        file: file,
      });
    }
  };

  const addDocument = () => {
    if (newDocument) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, newDocument],
      }));
      setNewDocument(null);
    }
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...application,
      ...formData,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    const file = e.dataTransfer.files[0];
    if (file) {
      setNewDocument({
        name: file.name,
        file: file,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl">
        <form onSubmit={handleSubmit}>
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-8 py-6 rounded-t-xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Editar Solicitud</h2>
                <p className="text-blue-100">#{application.id}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <FontAwesomeIcon icon="fa-solid fa-times" className="w-5 h-5" />
              </button>
            </div>
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
                    <span className="font-medium">{application.scholarship}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 w-32">Institución:</span>
                    <span className="font-medium">{application.institution}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 w-32">Monto:</span>
                    <span className="font-medium text-green-600">{application.amount}</span>
                  </div>
                </div>
              </div>

              {/* Documentos */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon="fa-solid fa-file-alt" />
                  Documentos
                </h3>
                <div className="space-y-4">
                  {/* Lista de documentos actuales */}
                  <div className="space-y-3">
                    {formData.documents.map((doc, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all group"
                      >
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                          <FontAwesomeIcon icon="fa-solid fa-file" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            {doc.size ? `${(doc.size / 1024 / 1024).toFixed(2)} MB` : 'Tamaño desconocido'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FontAwesomeIcon icon="fa-solid fa-trash" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Área de arrastrar y soltar */}
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon="fa-solid fa-cloud-upload-alt" className="text-3xl text-blue-500" />
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Arrastra y suelta tus archivos aquí</p>
                        <p className="text-sm text-gray-500">o haz clic para seleccionar archivos</p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Preview del nuevo documento */}
                  {newDocument && (
                    <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
                      <FontAwesomeIcon icon="fa-solid fa-file" className="text-blue-500" />
                      <span className="flex-1 font-medium text-blue-900">{newDocument.name}</span>
                      <button
                        type="button"
                        onClick={addDocument}
                        className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                      >
                        Agregar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Comentarios adicionales */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon="fa-solid fa-comment-alt" />
                  Comentarios Adicionales
                </h3>
                <div className="relative">
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12 min-h-[120px] resize-y"
                    placeholder="Añade cualquier información adicional relevante para tu solicitud..."
                  />
                  <div className="absolute right-3 bottom-3 text-gray-400">
                    <FontAwesomeIcon icon="fa-solid fa-pen" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  <FontAwesomeIcon icon="fa-solid fa-info-circle" className="mr-1" />
                  Este comentario será visible para el equipo de revisión
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-500">
                <FontAwesomeIcon icon="fa-solid fa-clock" className="mr-2" />
                <span className="text-sm">Última modificación: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <FontAwesomeIcon icon="fa-solid fa-times" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all flex items-center gap-2 hover:scale-105 transform active:scale-95"
                >
                  <FontAwesomeIcon icon="fa-solid fa-save" />
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
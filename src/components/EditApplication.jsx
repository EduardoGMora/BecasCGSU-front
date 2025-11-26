import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';
import { Modal, ModalContent, ModalFooter } from './common/Modal';
import { Section, InfoField } from './common/InfoComponents';
import { TextAreaField } from './common/FormFields';
import { CancelButton, SaveButton } from './common/Button';

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
    <Modal
      title={
        <div>
          <h2 className="text-2xl font-bold mb-2">Editar Solicitud</h2>
          <p className="text-blue-100 text-sm">#{application.id}</p>
        </div>
      }
      onClose={onClose}
      size="max-w-3xl"
    >
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <Section title="Información de la Beca">
            <div className="grid gap-4">
              <InfoField label="Nombre" value={application.scholarship} />
              <InfoField label="Institución" value={application.institution} />
              <InfoField label="Monto" value={application.amount} valueClass="text-green-600" />
            </div>
          </Section>

          <Section title={
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon="fa-solid fa-file-alt" />
              Documentos
            </span>
          }>
            <div className="space-y-4">
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
          </Section>

          <Section title={
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon="fa-solid fa-comment-alt" />
              Comentarios Adicionales
            </span>
          }>
            <TextAreaField
              value={formData.comments}
              onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
              placeholder="Añade cualquier información adicional relevante para tu solicitud..."
              rows={5}
            />
            <p className="mt-2 text-sm text-gray-500">
              <FontAwesomeIcon icon="fa-solid fa-info-circle" className="mr-1" />
              Este comentario será visible para el equipo de revisión
            </p>
          </Section>
        </ModalContent>

        <ModalFooter>
          <div className="flex items-center text-gray-500 mr-auto">
            <FontAwesomeIcon icon="fa-solid fa-clock" className="mr-2" />
            <span className="text-sm">Última modificación: {new Date().toLocaleDateString()}</span>
          </div>
          <CancelButton onClick={onClose} />
          <SaveButton type="submit" />
        </ModalFooter>
      </form>
    </Modal>
  );
};
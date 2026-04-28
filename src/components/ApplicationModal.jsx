import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 * ApplicationModal component to display scholarship application form
 * @param {Object} props
 * @param {boolean} props.isOpen - Si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Object} props.scholarship - Objeto de beca con detalles
 * @returns {JSX.Element|null} Componente Modal de Aplicación
 */
export const ApplicationModal = ({ isOpen, onClose, scholarship }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !scholarship) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-primary-purple flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 z-10">
          <h3 className="text-lg sm:text-2xl font-bold text-[#ffffff] pr-4">
            Aplicar a {scholarship.title}
          </h3>
          <button 
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-900 transition-colors flex-shrink-0"
          >
            <FontAwesomeIcon icon="fa-solid fa-times" />
          </button>
        </div>
        
        {/* Form Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Información de la beca */}
          <div className="bg-[#ebb7f7] border border-primary-purple rounded-lg p-4 text-primary-purple">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon="fa-solid fa-info-circle" className="text-primary-purple text-xl mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-primary-purple mb-1">Información de la Beca</h4>
                <p className="text-sm text-gray-700">{scholarship.description}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="bg-white px-2 py-1 rounded">
                    <strong>Monto:</strong> {scholarship.amount}
                  </span>
                  <span className="bg-white px-2 py-1 rounded">
                    <strong>Límite:</strong> {scholarship.deadline}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */} 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold mb-2 text-sm sm:text-base text-primary-purple">
                <FontAwesomeIcon icon="fa-solid fa-user #BF51D8" className="mr-2 text-primary-purple"  />
                Nombre Completo
              </label>
              <input 
                type="text" 
                placeholder="Tu nombre completo" 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base text-primary-purple">
                <FontAwesomeIcon icon="fa-solid fa-id-card" className="mr-2 text-primary-purple" />
                Código de Estudiante
              </label>
              <input 
                type="text" 
                placeholder="Tu código universitario" 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base text-primary-purple">
                <FontAwesomeIcon icon="fa-solid fa-graduation-cap" className="mr-2 text-primary-purple" />
                Carrera
              </label>
              <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-sm sm:text-base">
                <option>Selecciona tu carrera</option>
                <option>Ingeniería en Sistemas</option>
                <option>Medicina</option>
                <option>Derecho</option>
                <option>Psicología</option>
                <option>Administración</option>
                <option>Contaduría</option>
                <option>Arquitectura</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base text-primary-purple">
                <FontAwesomeIcon icon="fa-solid fa-star" className="mr-2 text-primary-purple" />
                Promedio Actual
              </label>
              <input 
                type="number" 
                step="0.1" 
                min="0" 
                max="10" 
                placeholder="9.5" 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base text-primary-purple">
                <FontAwesomeIcon icon="fa-solid fa-envelope" className="mr-2 text-primary-purple" />
                Correo Electrónico
              </label>
              <input 
                type="email" 
                placeholder="tu.correo@alumnos.udg.mx" 
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base text-primary-purple">
              <FontAwesomeIcon icon="fa-solid fa-pen" className="mr-2 text-primary-purple" />
              Carta de Motivación
            </label>
            <textarea 
              placeholder="Explica por qué mereces esta beca..." 
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg h-24 sm:h-32 focus:outline-none focus:border-primary-purple text-sm sm:text-base resize-none"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Mínimo 200 caracteres</p>
          </div>

          <div>
            <label className="block font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-primary-purple">
              <FontAwesomeIcon icon="fa-solid fa-folder-open" className="mr-2 text-primary-purple" />
              Documentos Requeridos
            </label>
            <div className="space-y-2 sm:space-y-3 bg-gray-50 p-3 sm:p-4 rounded-lg">
              {[
                'Kardex oficial actualizado',
                'Comprobante de ingresos familiar',
                'Carta de recomendación académica',
                'Identificación oficial vigente',
                'Comprobante de domicilio'
              ].map((doc, index) => (
                <label key={index} className="flex items-start gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                  <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-gray-700">{doc}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" className="mr-1 text-yellow-600" />
              Todos los documentos deben estar en formato PDF o JPG (máx. 5MB cada uno)
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base text-primary-purple">
              <FontAwesomeIcon icon="fa-solid fa-upload" className="mr-2 text-primary-purple" />
              Subir Documentos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-primary-purple transition-colors">
              <FontAwesomeIcon icon="fa-solid fa-cloud-upload-alt" className="text-3xl sm:text-4xl text-gray-400 mb-2" />
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Arrastra tus archivos aquí o haz clic para seleccionar
              </p>
              <input type="file" multiple className="hidden" id="file-upload" />
              <label 
                htmlFor="file-upload" 
                className="inline-block px-4 py-2 bg-primary-purple text-white rounded-lg cursor-pointer hover:bg-primary-pink transition-all text-sm"
              >
                Seleccionar Archivos
              </label>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-700">
                Acepto los términos y condiciones del programa de becas y autorizo el uso de mis datos personales 
                conforme al Aviso de Privacidad de la Universidad de Guadalajara.
              </span>
            </label>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-white flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end p-4 sm:p-6 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all text-sm sm:text-base order-2 sm:order-1"
          >
            <FontAwesomeIcon icon="fa-solid fa-times" className="mr-2" />
            Cancelar
          </button>
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-primary-purple text-white rounded-lg font-semibold hover:bg-primary-pink transition-all text-sm sm:text-base order-1 sm:order-2">
            <FontAwesomeIcon icon="fa-solid fa-paper-plane" className="mr-2" />
            Enviar Solicitud
          </button>
        </div>
      </div>
    </div>
  );
}

ApplicationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  scholarship: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.string,
    deadline: PropTypes.string,
  }),
};
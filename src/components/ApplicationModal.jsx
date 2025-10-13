// Modal de Aplicación
export const ApplicationModal = ({ isOpen, onClose, scholarship }) => {
  if (!isOpen || !scholarship) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-blue-900">Aplicar a {scholarship.title}</h3>
          <button onClick={onClose} className="text-2xl text-gray-600 hover:text-gray-900">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nombre Completo</label>
            <input type="text" placeholder="Tu nombre completo" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Código de Estudiante</label>
            <input type="text" placeholder="Tu código universitario" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Carrera</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option>Selecciona tu carrera</option>
              <option>Ingeniería en Sistemas</option>
              <option>Medicina</option>
              <option>Derecho</option>
              <option>Psicología</option>
              <option>Administración</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Promedio Actual</label>
            <input type="number" step="0.1" min="0" max="10" placeholder="9.5" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Carta de Motivación</label>
            <textarea placeholder="Explica por qué mereces esta beca..." className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32"></textarea>
          </div>
          <div>
            <label className="block font-semibold mb-4">Documentos Requeridos</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Kardex oficial</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Comprobante de ingresos</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Carta de recomendación</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Identificación oficial</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all">
            Cancelar
          </button>
          <button className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all">
            Enviar Solicitud
          </button>
        </div>
      </div>
    </div>
  );
};
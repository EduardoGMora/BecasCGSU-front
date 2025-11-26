import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Modal = ({ title, onClose, children, size = 'max-w-2xl' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className={`bg-white rounded-lg shadow-xl w-full ${size} my-8 max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Cerrar"
          >
            <FontAwesomeIcon icon="fa-solid fa-times" className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const ModalContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

export const ModalFooter = ({ children }) => (
  <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
    {children}
  </div>
);

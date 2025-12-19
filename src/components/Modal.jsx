import PropTypes from 'prop-types';

/**
 * Modal component to display content in a centered overlay
 * @param {Object} props
 * @param {boolean} props.isOpen - Indica si el modal está abierto.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {string} props.title - Título del modal.
 * @param {React.ReactNode} props.children - Contenido del modal.
 * @returns {JSX.Element} Modal component
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 rounded-t-xl">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-3xl hover:text-gray-200 transition-all">&times;</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

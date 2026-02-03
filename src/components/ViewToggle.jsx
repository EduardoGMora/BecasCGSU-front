import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/** 
 * ViewToggle component to switch between grid and list views
 * @param {Object} props
 * @param {string} props.viewType - Tipo de vista actual ('grid' o 'list').
 * @param {function} props.onViewChange - Función para manejar el cambio de vista.
 * @returns {JSX.Element} ViewToggle component
 */
export const ViewToggle = ({ viewType, onViewChange }) => {
  const activeStyle = "bg-brand-slate text-white border-brand-slate";
  const inactiveStyle = "border-gray-300 hover:bg-gray-100";

  const gridButtonStyle = viewType === "grid" ? activeStyle : inactiveStyle;
  const listButtonStyle = viewType === "list" ? activeStyle : inactiveStyle;

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-[#BF51D8]  ">
        Becas Encontradas
      </h2>
      <div className="flex gap-2">
        <button
          onClick={() => onViewChange("grid")}
          className={`p-2 border rounded-lg transition-all ${gridButtonStyle}`}
          aria-label="Vista de cuadrícula"
        >
          <FontAwesomeIcon icon="fa-solid fa-th-large" />
        </button>
        <button
          onClick={() => onViewChange("list")}
          className={`p-2 border rounded-lg transition-all ${listButtonStyle}`}
          aria-label="Vista de lista"
        >
          <FontAwesomeIcon icon="fa-solid fa-list" />
        </button>
      </div>
    </div>
  );
};

ViewToggle.propTypes = {
  viewType: PropTypes.oneOf(['grid', 'list']).isRequired,
  onViewChange: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';

/**
 * DetailCard component to display a labeled detail with optional background color
 * @param {Object} props
 * @param {string} props.label - Etiqueta descriptiva del detalle.
 * @param {string|number} props.value - Valor del detalle.
 * @param {string} [props.color] - Color de fondo opcional (gray, blue, green, purple, yellow).
 * @returns {JSX.Element} DetailCard component
 */
export const DetailCard = ({ label, value, color = "gray" }) => {
  const colors = {
    gray: "bg-gray-50",
    blue: "bg-blue-50 border-l-4 border-primary-cyan",
    green: "bg-green-50 border-l-4 border-primary-mint",
    purple: "bg-purple-50 border-l-4 border-primary-purple",
    yellow: "bg-yellow-50 border-l-4 border-primary-cyan"
  };
  
  return (
    <div className={`${colors[color]} p-3 rounded-lg`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );
};

/**
 * DetailSection component to group related details with a title
 * @param {Object} props
 * @param {string} props.title - Título de la sección.
 * @param {React.ReactNode} props.children - Contenido de la sección.
 * @param {string} [props.color] - Color de la sección (purple, yellow, blue).
 * @returns {JSX.Element} DetailSection component
 */
export const DetailSection = ({ title, children, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-50 border-l-4 border-primary-purple",
    yellow: "bg-yellow-50 border-l-4 border-primary-cyan",
    blue: "bg-blue-50 border-l-4 border-primary-cyan"
  };
  
  return (
    <div className={`${colors[color]} p-4 rounded-lg`}>
      <div className="text-sm font-semibold text-gray-700 mb-2">{title}</div>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

/**
 * DetailHeader component to display a header with title and subtitle
 * @param {Object} props
 * @param {string} props.title - Título principal.
 * @param {string} props.subtitle - Subtítulo descriptivo.
 * @returns {JSX.Element} DetailHeader component
 */
export const DetailHeader = ({ title, subtitle }) => (
  <div className="bg-primary-purple text-white p-4 rounded-lg">
    <h2 className="text-2xl font-bold mb-1">{title}</h2>
    <p className="text-purple-100">{subtitle}</p>
  </div>
);

DetailCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
};

DetailSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

DetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';

export const DetailCard = ({ label, value, color = "gray" }) => {
  const colors = {
    gray: "bg-gray-50",
    blue: "bg-blue-50 border-l-4 border-blue-500",
    green: "bg-green-50 border-l-4 border-green-500",
    purple: "bg-purple-50 border-l-4 border-purple-500",
    yellow: "bg-yellow-50 border-l-4 border-yellow-500"
  };
  
  return (
    <div className={`${colors[color]} p-3 rounded-lg`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="font-semibold text-sm">{value}</div>
    </div>
  );
};

export const DetailSection = ({ title, children, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-50 border-l-4 border-purple-500",
    yellow: "bg-yellow-50 border-l-4 border-yellow-500",
    blue: "bg-blue-50 border-l-4 border-blue-500"
  };
  
  return (
    <div className={`${colors[color]} p-4 rounded-lg`}>
      <div className="text-sm font-semibold text-gray-700 mb-2">{title}</div>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

export const DetailHeader = ({ title, subtitle }) => (
  <div className="bg-blue-900 text-white p-4 rounded-lg">
    <h2 className="text-2xl font-bold mb-1">{title}</h2>
    <p className="text-blue-100">{subtitle}</p>
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

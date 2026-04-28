import PropTypes from 'prop-types';

// Mapa de colores para ProgressBar
const COLOR_CLASSES = {
  'blue-900': 'bg-blue-900',
  'green-500': 'bg-green-500',
  'red-500': 'bg-red-500',
  'yellow-500': 'bg-yellow-500',
  'purple-500': 'bg-purple-500',
  'primary-purple': 'bg-primary-purple',
  'primary-pink': 'bg-primary-pink',
  'primary-cyan': 'bg-primary-cyan',
  'primary-mint': 'bg-primary-mint',
  'primary-slate': 'bg-primary-slate'
};

/**
 * Progress Bar Component
 * Displays a labeled progress bar with percentage
 * @param {Object} props
 * @param {string} props.label - Progress bar label
 * @param {number} props.value - Current value
 * @param {number} props.total - Total/max value
 * @param {string} props.color - Tailwind color class (e.g., 'blue-900', 'green-500')
 */
export const ProgressBar = ({ label, value, total, color = 'blue-900' }) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  const bgColorClass = COLOR_CLASSES[color] || COLOR_CLASSES['blue-900'];

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {value.toLocaleString()} ({percentage}%)
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${bgColorClass} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  color: PropTypes.string,
};

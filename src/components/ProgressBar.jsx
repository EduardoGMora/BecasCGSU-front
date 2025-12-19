import PropTypes from 'prop-types';

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
          className={`h-full bg-${color} transition-all duration-300`}
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

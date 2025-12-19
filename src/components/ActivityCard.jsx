import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/**
 * Activity/Status Card Component  
 * Displays an activity item with icon and description
 * @param {Object} props
 * @param {string} props.icon - FontAwesome icon class
 * @param {string} props.iconColor - Tailwind color class for icon
 * @param {string} props.borderColor - Tailwind color class for border
 * @param {string} props.title - Activity title
 * @param {string} props.description - Activity description
 * @returns {JSX.Element} ActivityCard component
 */
export const ActivityCard = ({ 
  icon, 
  iconColor = 'blue-500', 
  borderColor = 'blue-500',
  title, 
  description 
}) => {
  return (
    <div className={`flex items-center gap-3 p-3 border-l-4 border-${borderColor} bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors`}>
      <FontAwesomeIcon 
        icon={icon} 
        className={`text-${iconColor} text-xl flex-shrink-0`}
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 truncate">{title}</div>
        <div className="text-sm text-gray-600 truncate">{description}</div>
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  borderColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

// Mapa de colores predefinidos para evitar problemas con Tailwind
const COLOR_CLASSES = {
  'blue-500': {
    icon: 'text-blue-500',
    border: 'border-blue-500'
  },
  'green-500': {
    icon: 'text-green-500',
    border: 'border-green-500'
  },
  'red-500': {
    icon: 'text-red-500',
    border: 'border-red-500'
  },
  'yellow-500': {
    icon: 'text-yellow-500',
    border: 'border-yellow-500'
  },
  'purple-500': {
    icon: 'text-purple-500',
    border: 'border-purple-500'
  },
  'primary-purple': {
    icon: 'text-primary-purple',
    border: 'border-primary-purple'
  },
  'primary-pink': {
    icon: 'text-primary-pink',
    border: 'border-primary-pink'
  },
  'primary-cyan': {
    icon: 'text-primary-cyan',
    border: 'border-primary-cyan'
  },
  'primary-mint': {
    icon: 'text-primary-mint',
    border: 'border-primary-mint'
  }
};

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
  const colors = COLOR_CLASSES[borderColor] || COLOR_CLASSES['blue-500'];
  
  return (
    <div className={`flex items-center gap-3 p-3 border-l-4 ${colors.border} bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors`}>
      <FontAwesomeIcon 
        icon={icon} 
        className={`${colors.icon} text-xl flex-shrink-0`}
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 truncate">{title}</div>
        <div className="text-sm text-gray-800 truncate">{description}</div>
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

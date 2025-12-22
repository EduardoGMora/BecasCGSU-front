import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const COLOR_CLASS_MAP = {
  'brand-navy': {
    border: 'border-brand-navy',
    bg: 'bg-brand-navy',
    text: 'text-brand-navy',
  },
  'brand-slate': {
    border: 'border-brand-slate',
    bg: 'bg-brand-slate',
    text: 'text-brand-slate',
  },
  'brand-slate2': {
    border: 'border-brand-slate2',
    bg: 'bg-brand-slate2',
    text: 'text-brand-slate2',
  },
  'brand-cyan': {
    border: 'border-brand-cyan',
    bg: 'bg-brand-cyan',
    text: 'text-brand-cyan',
  },
  'brand-cyan2': {
    border: 'border-brand-cyan2',
    bg: 'bg-brand-cyan2',
    text: 'text-brand-cyan2',
  },
  'brand-teal': {
    border: 'border-brand-teal',
    bg: 'bg-brand-teal',
    text: 'text-brand-teal',
  },
  'brand-purple': {
    border: 'border-brand-purple',
    bg: 'bg-brand-purple',
    text: 'text-brand-purple',
  },
  'accent-magenta': {
    border: 'border-accent-magenta',
    bg: 'bg-accent-magenta',
    text: 'text-accent-magenta',
  },
};

/**
 * StatCard component to display a statistic with an icon, number, and label
 * @param {Object} props
 * @param {string} props.icon - Icono a mostrar.
 * @param {string} props.color - Color del componente.
 * @param {string|number} props.number - Número a mostrar.
 * @param {string} props.label - Etiqueta descriptiva.
 * @returns {JSX.Element} StatCard component
 */
export const StatCard = ({ icon, color, number, label }) => {
  const classes = COLOR_CLASS_MAP[color] ?? COLOR_CLASS_MAP['brand-slate'];

  return (
    <div className={`bg-white rounded-3xl shadow-sm hover:-translate-y-1 transition-all text-center border ${classes.border}`}>
      <div className={`text-4xl text-ui-textInverse ${classes.bg} rounded-t-3xl p-4 flex justify-center items-center`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="p-4">
        <div className={`${classes.text} font-bold text-4xl mb-2`}>{number}</div>
        <div className="text-gray-600 font-semibold">{label}</div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.keys(COLOR_CLASS_MAP)).isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};
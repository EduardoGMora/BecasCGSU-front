import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

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
 * @param {boolean} [props.isMoney=false] - Indica si el número representa una cantidad monetaria.
 * @returns {JSX.Element} StatCard component
 */
export const StatCard = ({ icon, color, number, label, isMoney=false, mount="M" }) => {
  const classes = COLOR_CLASS_MAP[color] ?? COLOR_CLASS_MAP['brand-slate'];

  const targetNumber = useMemo(() => {
    if (typeof number === 'number') return number;
    if (typeof number === 'string') {
      const normalized = number.replace(/,/g, '').trim();
      const parsed = Number(normalized);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  }, [number]);

  const [animatedNumber, setAnimatedNumber] = useState(() => (targetNumber == null ? null : 0));

  useEffect(() => {
    if (targetNumber == null) {
      setAnimatedNumber(null);
      return;
    }

    const durationMs = 900;
    const startValue = 0;
    const endValue = targetNumber;
    const startTime = performance.now();

    let rafId = 0;
    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = startValue + (endValue - startValue) * eased;
      setAnimatedNumber(Number.isInteger(endValue) ? Math.round(current) : current);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };

    setAnimatedNumber(startValue);
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetNumber]);

  const displayValue = targetNumber == null ? number : (Number.isInteger(targetNumber) ? animatedNumber : animatedNumber?.toFixed(2));

  return (
    <div className={`bg-white rounded-3xl shadow-sm hover:-translate-y-1 transition-all text-center border ${classes.border}`}>
      <div className={`text-4xl text-ui-textInverse ${classes.bg} rounded-t-3xl p-4 flex justify-center items-center`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="p-4">
        <div className={`${classes.text} font-bold text-4xl mb-2`}>{isMoney ? `$${displayValue} ${mount}` : displayValue}</div>
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
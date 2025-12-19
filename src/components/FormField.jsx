import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Reusable form field component with support for input, textarea, and select
 * @param {Object} props
 * @param {string} props.label - Field label
 * @param {string} props.name - Field name attribute
 * @param {string} props.type - Field type (text, textarea, select, email, tel, number, etc.)
 * @param {string} props.value - Field value
 * @param {Function} props.onChange - Change handler function
 * @param {boolean} props.required - Whether field is required
 * @param {string} props.step - Step for number inputs
 * @param {Array} props.options - Options for select field
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message to display
 * @param {string} props.icon - FontAwesome icon class
 * @param {string} props.helperText - Helper text below the field
 * @param {string} props.className - Additional classes for the wrapper
 * @returns {JSX.Element} Form field component
 */
export const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  required = true, 
  step,
  options = [],
  placeholder,
  error,
  icon,
  helperText,
  className = ""
}) => {
  const baseInputClass = "w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base";
  const inputClass = error 
    ? `${baseInputClass} border-red-500`
    : `${baseInputClass} border-gray-300`;

  return (
    <div className={className}>
      <label className="block font-semibold mb-2 text-sm sm:text-base">
        {icon && <FontAwesomeIcon icon={icon} className="mr-2 text-blue-900" />}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea 
          name={name} 
          value={value} 
          onChange={onChange} 
          required={required}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
          rows="4" 
        />
      ) : type === "select" ? (
        <select 
          name={name} 
          value={value} 
          onChange={onChange} 
          required={required}
          className={inputClass}
        >
          <option value="">Selecciona una opción</option>
          {options.map((option, index) => (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : (
        <input 
          type={type} 
          name={name} 
          step={step} 
          value={value} 
          onChange={onChange} 
          required={required}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  step: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  helperText: PropTypes.string,
  className: PropTypes.string,
};

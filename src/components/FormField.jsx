import PropTypes from 'prop-types';

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
  error
}) => {
  const baseInputClass = "w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-all";
  const inputClass = error 
    ? `${baseInputClass} border-red-500 focus:border-red-500 focus:ring-red-200`
    : `${baseInputClass} border-gray-300 focus:border-blue-500 focus:ring-blue-200`;

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2 text-gray-700">
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
          className={inputClass}
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
};

export const FormField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false, 
  placeholder = '',
  className = ''
}) => (
  <div>
    <label className="block text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border rounded-lg ${className}`}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export const TextAreaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false, 
  placeholder = '',
  rows = 4
}) => (
  <div>
    <label className="block text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg"
      required={required}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

export const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false 
}) => (
  <div>
    <label className="block text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg"
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

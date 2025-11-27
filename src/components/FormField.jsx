export const FormField = ({ label, name, type = "text", value, onChange, required = true, step }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold mb-2 text-gray-700">{label}</label>
    {type === "textarea" ? (
      <textarea 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required} 
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
        rows="4" 
      />
    ) : type === "select" ? (
      <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required} 
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
      >
        {onChange.options}
      </select>
    ) : (
      <input 
        type={type} 
        name={name} 
        step={step} 
        value={value} 
        onChange={onChange} 
        required={required} 
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
      />
    )}
  </div>
);

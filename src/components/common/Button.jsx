export const Button = ({ 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false, 
  children, 
  className = '' 
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    success: 'bg-green-500 text-white hover:bg-green-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warning: 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${variants[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const CancelButton = ({ onClick }) => (
  <Button variant="secondary" onClick={onClick}>
    Cancelar
  </Button>
);

export const SaveButton = ({ onClick, type = 'submit' }) => (
  <Button variant="primary" onClick={onClick} type={type}>
    Guardar
  </Button>
);

export const CloseButton = ({ onClick }) => (
  <Button variant="secondary" onClick={onClick}>
    Cerrar
  </Button>
);

export const STATUS_CONFIG = {
  approved: { bg: 'bg-green-500', text: 'text-white', label: 'Aprobada' },
  pending: { bg: 'bg-yellow-500', text: 'text-gray-900', label: 'En Proceso' },
  rejected: { bg: 'bg-red-500', text: 'text-white', label: 'Rechazada' },
  active: { bg: 'bg-green-500', text: 'text-white', label: 'Activa' },
  inactive: { bg: 'bg-red-500', text: 'text-white', label: 'Inactiva' },
  open: { bg: 'bg-green-500', text: 'text-white', label: 'Abierta' },
  closed: { bg: 'bg-red-500', text: 'text-white', label: 'Cerrada' }
};

export const ROLE_CONFIG = {
  admin: { bg: 'bg-red-500', text: 'text-white', label: 'Administrador' },
  evaluator: { bg: 'bg-blue-500', text: 'text-white', label: 'Evaluador' },
  user: { bg: 'bg-gray-500', text: 'text-white', label: 'Usuario' }
};

export const StatusBadge = ({ status, config = STATUS_CONFIG }) => {
  const statusConfig = config[status] || config.rejected || config.inactive;
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex ${statusConfig.bg} ${statusConfig.text}`}>
      {statusConfig.label}
    </span>
  );
};

export const InfoField = ({ label, value, className = '' }) => (
  <div className="flex items-start">
    <span className="text-gray-600 w-32">{label}:</span>
    <span className={`font-medium flex-1 ${className}`}>{value}</span>
  </div>
);

export const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-blue-900 mb-4">{title}</h3>
    {children}
  </div>
);

export const InfoGrid = ({ children }) => (
  <div className="grid gap-4">{children}</div>
);

export const ContentGrid = ({ children }) => (
  <div className="grid gap-6">{children}</div>
);

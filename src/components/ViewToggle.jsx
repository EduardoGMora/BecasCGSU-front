import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ViewToggle = ({ viewType, onViewChange }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-blue-900">
        Becas Encontradas
      </h2>
      <div className="flex gap-2">
        <button
          onClick={() => onViewChange("grid")}
          className={`p-2 border rounded-lg transition-all ${
            viewType === "grid"
              ? "bg-blue-900 text-white border-blue-900"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <FontAwesomeIcon icon="fa-solid fa-th-large" />
        </button>
        <button
          onClick={() => onViewChange("list")}
          className={`p-2 border rounded-lg transition-all ${
            viewType === "list"
              ? "bg-blue-900 text-white border-blue-900"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          <FontAwesomeIcon icon="fa-solid fa-list" />
        </button>
      </div>
    </div>
  );
};

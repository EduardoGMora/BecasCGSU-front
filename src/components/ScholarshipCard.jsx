import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from './Modal';
import { DetailCard } from './DetailCard';
import { SCHOLARSHIP_STATUS } from '../constants';
import UdeGLogo from '../assets/Escudo_UdeG.svg';

/**
 * Scholarship Card Component
 * Displays scholarship information in a card format
 * @param {Object} props
 * @param {Object} props.scholarship - Scholarship data
 * @param {Function} props.onApply - Callback when apply button is clicked
 */
export const ScholarshipCard = ({ scholarship, onApply }) => {
  const [showModal, setShowModal] = useState(false);
  
  const isOpen = scholarship.status === SCHOLARSHIP_STATUS.OPEN;
  const isExternal = scholarship.institution !== 'Universidad de Guadalajara';

  const scholarshipColor = isExternal ? 'accent-magenta' : 'accent-mint';

  const borderColor = isOpen ? `border-${scholarshipColor}` : 'border-red-500 opacity-70';
  const statusBadge = isOpen ? 'bg-green-500' : 'bg-red-500';
  const statusText = isOpen ? 'Abierta' : 'Cerrada';

  return (
    <>
    <div 
      className={`bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 cursor-pointer ${borderColor}`}
      onClick={() => setShowModal(true)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && setShowModal(true)}
      aria-label={`Ver detalles de ${scholarship.title}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
        <div className="flex-1 w-full">
          <h3 className="text-lg sm:text-xl font-bold text-primary-slate mb-3 line-clamp-2">
            {scholarship.title}
          </h3>
          
          {/* UdeG or External Badge */}
          <div className="mb-3">
            {isExternal ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-magenta/10 border border-accent-magenta rounded-full text-xs font-semibold text-accent-magenta">
                <FontAwesomeIcon icon="fa-solid fa-globe" className="w-3.5 h-3.5" />
                Beca Externa
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-mint/10 border border-accent-mint rounded-full text-xs font-semibold text-accent-mint">
                <img src={UdeGLogo} alt="UdeG" className="w-4 h-4 object-contain" />
                Universidad de Guadalajara
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-800">
              <FontAwesomeIcon 
                icon={scholarship.institution === 'Universidad de Guadalajara' ? 'fa-solid fa-university' : 'fa-solid fa-building'} 
                className={`w-4 text-${scholarshipColor} flex-shrink-0`}
              />
              <span className="truncate">{scholarship.institution}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FontAwesomeIcon icon="fa-solid fa-calendar" className={`w-4 text-${scholarshipColor} flex-shrink-0`} />
              <span className="truncate">Límite: {scholarship.deadline}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <FontAwesomeIcon icon="fa-solid fa-users" className={`w-4 text-${scholarshipColor} flex-shrink-0`} />
              <span>{scholarship.beneficiaries} beneficiarios</span>
            </div>
          </div>
        </div>
        
        <span 
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap self-start sm:self-auto ${statusBadge} text-white`}
        >
          {statusText}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-3">
        {scholarship.description}
      </p>
      
      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-auto pt-4 border-t border-gray-100">
        <span className="text-xl sm:text-2xl font-bold text-primary-slate">
          {scholarship.amount}
        </span>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) {
              onApply(scholarship);
            }
          }}
          disabled={!isOpen}
          className={`w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-sm sm:text-base ${
            isOpen
              ? 'bg-primary-purple text-white hover:bg-primary-pink active:scale-95'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          aria-label={isOpen ? `Aplicar a ${scholarship.title}` : 'Beca cerrada'}
        >
          {scholarship.status === 'open' ? (
            <>
              <FontAwesomeIcon icon="fa-solid fa-paper-plane" className="mr-2" />
              Aplicar
            </>
          ) : (
            'Ver Detalles'
          )}
        </button>
      </div>
    </div>

    <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Detalles de la Beca">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary-slate mb-2">{scholarship.title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            scholarship.status === 'open' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {scholarship.status === 'open' ? 'Abierta' : 'Cerrada'}
          </span>
          {isExternal ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-magenta/10 border border-accent-magenta rounded-full text-xs font-semibold text-accent-magenta">
              <FontAwesomeIcon icon="fa-solid fa-globe" className="w-3 h-3" />
              Externa
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-mint/10 border border-accent-mint rounded-full text-xs font-semibold text-accent-mint">
              <img src={UdeGLogo} alt="UdeG" className="w-3.5 h-3.5 object-contain" />
              UdeG
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <DetailCard label="Institución" value={scholarship.institution} />
        <div className="bg-green-50 p-3 rounded-lg border-l-4 border-primary-mint">
          <div className="text-xs text-gray-500 mb-1">Monto</div>
          <div className="font-semibold text-primary-mint">{scholarship.amount}</div>
        </div>
        <DetailCard label="Fecha Límite" value={scholarship.deadline} />
        <DetailCard label="Beneficiarios" value={scholarship.beneficiaries} />
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-primary-purple">
          <h4 className="font-bold text-gray-700 mb-2">Descripción</h4>
          <p className="text-gray-700">{scholarship.description}</p>
        </div>

        {scholarship.requirements && (
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-primary-cyan">
            <h4 className="font-bold text-gray-700 mb-2">Requisitos</h4>
            {/* scholarships.requirements is an array */}
            <div className="text-gray-700 space-y-1">
              {scholarship.requirements.map((req, index) => (
                <p key={index}>• {req}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button
          onClick={() => setShowModal(false)}
          className="flex-1 px-4 py-3 bg-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-400 transition-all"
        >
          Cerrar
        </button>
        {scholarship.status === 'open' && (
          <button
            onClick={() => {
              setShowModal(false);
              onApply(scholarship);
            }}
            className="flex-1 px-4 py-3 bg-primary-purple text-white rounded-lg font-semibold hover:bg-primary-pink transition-all"
          >
            <FontAwesomeIcon icon="fa-solid fa-paper-plane" className="mr-2" />
            Aplicar Ahora
          </button>
        )}
      </div>
    </Modal>
    </>
  );
};

ScholarshipCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    institution: PropTypes.string,
    deadline: PropTypes.string,
    beneficiaries: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    amount: PropTypes.string,
    status: PropTypes.string.isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onApply: PropTypes.func.isRequired,
};
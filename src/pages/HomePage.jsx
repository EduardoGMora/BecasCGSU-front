import { StatCard } from '../components/StatCard';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { Link, useOutletContext } from 'react-router-dom';
import { HeroCard } from '../components/HeroCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTES } from '../constants';
import Scholarships from '../mocks/scholarships.json';

/**
 * Home Page Component
 * Displays dashboard with stats and featured scholarships
 */
export function HomePage(){
  const { handleApply } = useOutletContext();
  const featuredScholarships = Scholarships.filter(scholarship => scholarship.featured);

  return (
    <>
      <HeroCard 
        title="Portal de Becas CGSU"
        subtitle="Descubre oportunidades de financiamiento educativo de la Universidad de Guadalajara y instituciones colaboradoras"
      >
        <input
            type="text"
            placeholder="Buscar por palabra clave, carrera, institución..."
            className="flex-1 px-5 py-3 rounded-lg text-gray-900"
        />
        <button className="px-6 py-3 bg-blue-800 hover:bg-blue-950 rounded-lg font-semibold transition-all hover:transform hover:-translate-y-0.5">
            <FontAwesomeIcon icon="fa-solid fa-search" className="mr-2" />Buscar
        </button>
      </HeroCard>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="fas fa-award" number="127" label="Becas Activas" />
        <StatCard icon="fas fa-users" number="3,542" label="Estudiantes Beneficiados" />
        <StatCard icon="fas fa-dollar-sign" number="$45M" label="Monto Total Otorgado" />
        <StatCard icon="fas fa-handshake" number="23" label="Instituciones Aliadas" />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-900">Becas Destacadas</h2>
          <Link 
            to={ROUTES.SCHOLARSHIPS} 
            className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors"
          >
            Ver Todas →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredScholarships.map(scholarship => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} onApply={handleApply} />
          ))}
        </div>
      </section>
    </>
  );
};

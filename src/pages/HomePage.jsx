import { StatCard } from '../components/StatCard';
import { ScholarshipCard } from '../components/ScholarShipCard';
import { Link, useOutletContext } from 'react-router-dom';
import { HeroCard } from '../components/HeroCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// HomePage
export function HomePage(){
  const { handleApply } = useOutletContext();
  const featuredScholarships = [
    {
      id: 1,
      title: 'Beca de Excelencia Académica 2025',
      institution: 'Universidad de Guadalajara',
      deadline: '15 de Diciembre, 2025',
      beneficiaries: 50,
      description: 'Beca dirigida a estudiantes con promedio superior a 9.5. Cubre 100% de colegiatura y gastos de manutención.',
      amount: '$50,000 MXN',
      status: 'open'
    },
    {
      id: 2,
      title: 'Beca de Apoyo Socioeconómico',
      institution: 'Fundación Telmex',
      deadline: '20 de Diciembre, 2025',
      beneficiaries: 200,
      description: 'Apoyo financiero para estudiantes con comprobada necesidad económica y buen rendimiento académico.',
      amount: '$25,000 MXN',
      status: 'open'
    },
    {
      id: 3,
      title: 'Beca de Innovación Tecnológica',
      institution: 'Google México',
      deadline: '10 de Enero, 2026',
      beneficiaries: 25,
      description: 'Programa exclusivo para estudiantes de tecnología con proyectos innovadores y impacto social.',
      amount: '$75,000 MXN',
      status: 'open'
    }
  ];

  return (
    <div className="pt-20">
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
          <Link to="/becas" className="text-blue-600 hover:underline">
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredScholarships.map(scholarship => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} onApply={handleApply} />
          ))}
        </div>
      </section>
    </div>
  );
};

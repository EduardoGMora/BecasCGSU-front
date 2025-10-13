import { StatCard } from '../components/StatCard';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { Link } from 'react-router-dom';

// HomePage
export function HomePage({ onApply }){
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
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg p-16 mb-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Portal de Becas Universitarias</h1>
        <p className="text-xl mb-6 opacity-90">
          Descubre oportunidades de financiamiento educativo de la Universidad de Guadalajara y instituciones colaboradoras
        </p>
        <div className="flex gap-4 max-w-2xl mx-auto mt-6">
          <input
            type="text"
            placeholder="Buscar por palabra clave, carrera, institución..."
            className="flex-1 px-5 py-3 rounded-lg text-gray-900"
          />
          <button className="px-6 py-3 bg-blue-800 hover:bg-blue-950 rounded-lg font-semibold transition-all hover:transform hover:-translate-y-0.5">
            <i className="fas fa-search mr-2"></i>Buscar
          </button>
        </div>
      </section>

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
          {/* <button
            
            className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all"
          >
            Ver Todas
          </button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredScholarships.map(scholarship => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} onApply={onApply} />
          ))}
        </div>
      </section>
    </div>
  );
};

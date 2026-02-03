import { StatCard } from '../components/StatCard';
import { ScholarshipCard } from '../components/ScholarshipCard';
import { Link, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ROUTES } from '../constants';
import Scholarships from '../mocks/scholarships.json';
import girlHomepage from '../assets/home_page_girl.png';
import Carrusel from '../components/Carrusel';

/**
 * Home Page Component Displays dashboard with stats and featured scholarships
 * @returns {JSX.Element} HomePage component
 */
export function HomePage(){
  const { handleApply } = useOutletContext();
  const featuredScholarships = Scholarships.filter(scholarship => scholarship.featured);

  return (
    <>
      <Carrusel />

      <article className="my-8 lg:flex items-center gap-8">
        <img src={girlHomepage} alt="Chica en la página de inicio" />
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center justify-center mb-4 gap-2">
            <FontAwesomeIcon icon="fas fa-info-circle" className="text-ui-textMuted text-2xl" />
            <h1 className="font-display text-ui-textMuted text-3xl font-bold">Bienvenido al Portal de Becas CGSU</h1>
          </div>
          <p className="text-ui-textMuted text-lg leading-relaxed">
            La Plataforma Única de Becas (PUB) de la Universidad de Guadalajara es un sistema centralizado que reúne en un solo espacio toda la información relacionada con apoyos económicos, estímulos académicos y oportunidades de financiamiento para estudiantes. Su finalidad es simplificar el acceso a las convocatorias, estandarizar los procesos y ofrecer una experiencia más transparente y eficiente, evitando que los alumnos tengan que buscar información dispersa en distintos sitios o dependencias. <br /><br />
            La importancia de esta plataforma radica en que facilita la igualdad de oportunidades, ya que permite que cualquier estudiante conozca, compare y solicite las becas disponibles de manera ágil. Además, mejora la gestión institucional al unificar criterios, automatizar trámites y asegurar un seguimiento claro de cada solicitud. Gracias a ello, la comunidad estudiantil puede concentrarse en su desempeño académico mientras accede a apoyos que contribuyen a su permanencia y desarrollo dentro de la universidad.
          </p>
        </div>
      </article> 

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8 lg:my-16">
        <StatCard icon="fas fa-award" color="brand-slate" number="127" label="Becas Activas" />
        <StatCard icon="fas fa-users" color="brand-cyan2" number="3,542" label="Estudiantes Beneficiados" />
        <StatCard icon="fas fa-dollar-sign" color="accent-magenta" number="45" isMoney={true} label="Monto Total Otorgado" />
        <StatCard icon="fas fa-handshake" color="brand-slate2" number="23" label="Instituciones Aliadas" />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-3xl font-bold">Becas Destacadas</h2>
          <Link 
            to={ROUTES.SCHOLARSHIPS} 
            className="text-primary-purple hover:text-primary-pink hover:underline font-semibold transition-colors"
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

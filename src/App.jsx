import React, { useState } from 'react';

// Componente Header
const Header = ({ currentPage, setCurrentPage, isAdmin, toggleAdmin }) => {
  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-xl font-bold text-blue-900 flex items-center gap-2"
        >
          <i className="fas fa-graduation-cap"></i>
          Universidad de Guadalajara
        </button>
        
        <nav className="flex items-center gap-6">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === 'home' ? 'bg-gray-200 text-blue-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setCurrentPage('scholarships')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === 'scholarships' ? 'bg-gray-200 text-blue-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Becas Disponibles
          </button>
          <button
            onClick={() => setCurrentPage('applications')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === 'applications' ? 'bg-gray-200 text-blue-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Mis Solicitudes
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currentPage === 'contact' ? 'bg-gray-200 text-blue-900' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Contacto
          </button>
          
          <button
            onClick={toggleAdmin}
            className="p-2 text-blue-900 hover:bg-gray-200 rounded-full transition-all"
          >
            <i className={`fas ${isAdmin ? 'fa-user-shield' : 'fa-user-cog'} text-xl`}></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

// Componente StatCard
const StatCard = ({ icon, number, label }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:transform hover:-translate-y-1 transition-all text-center">
      <div className="text-4xl text-blue-900 mb-4">
        <i className={icon}></i>
      </div>
      <div className="text-3xl font-bold text-blue-900 mb-2">{number}</div>
      <div className="text-gray-600 font-semibold">{label}</div>
    </div>
  );
};

// Componente ScholarshipCard
const ScholarshipCard = ({ scholarship, onApply }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:transform hover:-translate-y-1 transition-all border-l-4 ${
      scholarship.status === 'open' ? 'border-blue-900' : 'border-red-500 opacity-70'
    }`}>
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-900 mb-3">{scholarship.title}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className={`fas ${scholarship.institution === 'Universidad de Guadalajara' ? 'fa-university' : 'fa-building'} w-4 text-blue-900`}></i>
              <span>{scholarship.institution}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-calendar w-4 text-blue-900"></i>
              <span>Fecha límite: {scholarship.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="fas fa-users w-4 text-blue-900"></i>
              <span>{scholarship.beneficiaries} beneficiarios</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
          scholarship.status === 'open' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {scholarship.status === 'open' ? 'Abierta' : 'Cerrada'}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4">{scholarship.description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold text-green-600">{scholarship.amount}</span>
        <button
          onClick={() => onApply(scholarship)}
          disabled={scholarship.status !== 'open'}
          className={`px-5 py-2 rounded-lg font-semibold transition-all ${
            scholarship.status === 'open'
              ? 'bg-blue-900 text-white hover:bg-blue-800 hover:transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {scholarship.status === 'open' ? 'Aplicar' : 'Ver Detalles'}
        </button>
      </div>
    </div>
  );
};

// Componente HomePage
const HomePage = ({ setCurrentPage, onApply }) => {
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
          <button
            onClick={() => setCurrentPage('scholarships')}
            className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all"
          >
            Ver Todas
          </button>
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

// Componente ScholarshipsPage
const ScholarshipsPage = ({ onApply }) => {
  const [viewType, setViewType] = useState('grid');
  
  const scholarships = [
    {
      id: 1,
      title: 'Beca de Excelencia Académica 2025',
      institution: 'Universidad de Guadalajara',
      deadline: '15 de Diciembre, 2025',
      beneficiaries: 50,
      description: 'Beca dirigida a estudiantes con promedio superior a 9.5. Cubre 100% de colegiatura y gastos de manutención mensual.',
      amount: '$50,000 MXN',
      status: 'open'
    },
    {
      id: 2,
      title: 'Programa de Apoyo Socioeconómico',
      institution: 'Fundación Telmex',
      deadline: '20 de Diciembre, 2025',
      beneficiaries: 200,
      description: 'Apoyo financiero para estudiantes con comprobada necesidad económica y buen rendimiento académico (promedio mínimo 8.0).',
      amount: '$25,000 MXN',
      status: 'open'
    },
    {
      id: 3,
      title: 'Beca de Innovación Tecnológica',
      institution: 'Google México',
      deadline: '10 de Enero, 2026',
      beneficiaries: 25,
      description: 'Programa exclusivo para estudiantes de ingeniería en sistemas con proyectos innovadores y potencial de impacto social.',
      amount: '$75,000 MXN',
      status: 'open'
    },
    {
      id: 4,
      title: 'Beca Deportiva de Alto Rendimiento',
      institution: 'Universidad de Guadalajara',
      deadline: '5 de Enero, 2026',
      beneficiaries: 30,
      description: 'Dirigida a deportistas destacados en disciplinas olímpicas con representación nacional o internacional.',
      amount: '$40,000 MXN',
      status: 'open'
    },
    {
      id: 5,
      title: 'Programa de Investigación Científica',
      institution: 'CONACyT',
      deadline: '25 de Enero, 2026',
      beneficiaries: 15,
      description: 'Beca para estudiantes de posgrado con proyectos de investigación en ciencias exactas y naturales.',
      amount: '$120,000 MXN',
      status: 'open'
    },
    {
      id: 6,
      title: 'Beca de Intercambio Internacional',
      institution: 'Fundación BBVA',
      deadline: '31 de Octubre, 2025',
      beneficiaries: 10,
      description: 'Programa de movilidad estudiantil para realizar un semestre en universidades europeas de prestigio.',
      amount: '$200,000 MXN',
      status: 'closed'
    }
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg p-16 mb-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Becas Disponibles</h1>
        <p className="text-xl mb-6 opacity-90">Explora todas las oportunidades de financiamiento disponibles</p>
        <div className="flex gap-4 max-w-2xl mx-auto mt-6">
          <input
            type="text"
            placeholder="Buscar becas..."
            className="flex-1 px-5 py-3 rounded-lg text-gray-900"
          />
          <button className="px-6 py-3 bg-blue-800 hover:bg-blue-950 rounded-lg font-semibold transition-all">
            <i className="fas fa-search mr-2"></i>Buscar
          </button>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          <i className="fas fa-filter mr-2"></i>Filtros de Búsqueda
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
          <div>
            <label className="block font-semibold mb-2">Tipo de Beca</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Todas</option>
              <option>Excelencia Académica</option>
              <option>Necesidad Económica</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Área de Estudio</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Todas</option>
              <option>Ingeniería</option>
              <option>Ciencias de la Salud</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Institución</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Todas</option>
              <option>Universidad de Guadalajara</option>
              <option>Fundación Telmex</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Monto Mínimo</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Cualquier monto</option>
              <option>$10,000 - $25,000</option>
              <option>$25,000 - $50,000</option>
            </select>
          </div>
          <button className="px-5 py-2 border border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-all">
            Limpiar
          </button>
          <button className="px-5 py-2 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all">
            Aplicar
          </button>
        </div>
      </section>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">127 Becas Encontradas</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType('grid')}
            className={`p-2 border rounded-lg transition-all ${
              viewType === 'grid' 
                ? 'bg-blue-900 text-white border-blue-900' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-th"></i>
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`p-2 border rounded-lg transition-all ${
              viewType === 'list' 
                ? 'bg-blue-900 text-white border-blue-900' 
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            <i className="fas fa-list"></i>
          </button>
        </div>
      </div>

      <div className={viewType === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {scholarships.map(scholarship => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} onApply={onApply} />
        ))}
      </div>
    </div>
  );
};

// Componente ApplicationsPage
const ApplicationsPage = () => {
  const applications = [
    { id: 1, scholarship: 'Beca de Excelencia Académica', institution: 'Universidad de Guadalajara', date: '15 Nov 2025', status: 'approved', amount: '$50,000' },
    { id: 2, scholarship: 'Programa de Apoyo Socioeconómico', institution: 'Fundación Telmex', date: '20 Nov 2025', status: 'pending', amount: '$25,000' },
    { id: 3, scholarship: 'Beca de Innovación Tecnológica', institution: 'Google México', date: '25 Nov 2025', status: 'pending', amount: '$75,000' },
    { id: 4, scholarship: 'Beca Deportiva', institution: 'Universidad de Guadalajara', date: '10 Oct 2025', status: 'rejected', amount: '$40,000' },
    { id: 5, scholarship: 'Beca de Intercambio', institution: 'Fundación BBVA', date: '05 Oct 2025', status: 'rejected', amount: '$200,000' }
  ];

  const getStatusStyle = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-500 text-white';
      case 'pending': return 'bg-yellow-500 text-gray-900';
      case 'rejected': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return 'Aprobada';
      case 'pending': return 'En Proceso';
      case 'rejected': return 'Rechazada';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg p-16 mb-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Mis Solicitudes</h1>
        <p className="text-xl opacity-90">Administra y da seguimiento a tus aplicaciones de beca</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="fas fa-paper-plane" number="5" label="Solicitudes Enviadas" />
        <StatCard icon="fas fa-clock" number="2" label="En Proceso" />
        <StatCard icon="fas fa-check-circle" number="1" label="Aprobadas" />
        <StatCard icon="fas fa-times-circle" number="2" label="Rechazadas" />
      </section>

      <section className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-blue-900 text-white px-6 py-4">
          <h3 className="text-xl font-bold">Solicitudes de Beca</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Beca</th>
                <th className="px-6 py-4 text-left font-semibold">Institución</th>
                <th className="px-6 py-4 text-left font-semibold">Fecha Aplicación</th>
                <th className="px-6 py-4 text-left font-semibold">Estado</th>
                <th className="px-6 py-4 text-left font-semibold">Monto</th>
                <th className="px-6 py-4 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">{app.scholarship}</td>
                  <td className="px-6 py-4">{app.institution}</td>
                  <td className="px-6 py-4">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}>
                      {getStatusText(app.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{app.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold hover:bg-yellow-600 transition-all">
                        Ver
                      </button>
                      {app.status === 'pending' && (
                        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600 transition-all">
                          Editar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// Componente ContactPage
const ContactPage = () => {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg p-16 mb-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Contacto</h1>
        <p className="text-xl opacity-90">¿Tienes preguntas sobre las becas? Estamos aquí para ayudarte</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            <i className="fas fa-phone mr-2"></i>Teléfono
          </h3>
          <p className="font-semibold mb-2">Centro de Atención:</p>
          <p className="text-gray-600 mb-3">33 3134-2222 ext. 12345</p>
          <p className="font-semibold mb-2">Horario:</p>
          <p className="text-gray-600">Lunes a Viernes 8:00 - 18:00</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            <i className="fas fa-envelope mr-2"></i>Correo Electrónico
          </h3>
          <p className="font-semibold mb-2">Becas UDG:</p>
          <p className="text-gray-600 mb-3">becas@udg.mx</p>
          <p className="font-semibold mb-2">Soporte Técnico:</p>
          <p className="text-gray-600">soporte.becas@udg.mx</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            <i className="fas fa-map-marker-alt mr-2"></i>Ubicación
          </h3>
          <p className="font-semibold mb-2">Oficina de Becas:</p>
          <p className="text-gray-600">
            Av. Juárez No. 976<br/>
            Col. Centro, Guadalajara, Jal.<br/>
            C.P. 44100
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-6">Enviar Mensaje</h3>
        <div className="grid gap-4">
          <div>
            <label className="block font-semibold mb-2">Nombre Completo</label>
            <input type="text" placeholder="Tu nombre completo" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Correo Electrónico</label>
            <input type="email" placeholder="tu.correo@ejemplo.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Asunto</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option>Selecciona un tema</option>
              <option>Información sobre becas</option>
              <option>Estado de mi solicitud</option>
              <option>Documentación requerida</option>
              <option>Problemas técnicos</option>
              <option>Otro</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Mensaje</label>
            <textarea placeholder="Describe tu consulta o problema..." className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32"></textarea>
          </div>
          <button className="w-fit px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all">
            <i className="fas fa-paper-plane mr-2"></i>Enviar Mensaje
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente AdminPanel
const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-lg p-12 mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          <i className="fas fa-cog mr-3"></i>Panel de Administración
        </h1>
        <p className="text-lg opacity-90">Gestión integral del sistema de becas</p>
      </section>

      <nav className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'overview'
              ? 'bg-blue-900 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-chart-line mr-2"></i>Resumen
        </button>
        <button
          onClick={() => setActiveSection('scholarships')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'scholarships'
              ? 'bg-blue-900 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-award mr-2"></i>Gestión de Becas
        </button>
        <button
          onClick={() => setActiveSection('applications')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'applications'
              ? 'bg-blue-900 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-file-alt mr-2"></i>Solicitudes
        </button>
        <button
          onClick={() => setActiveSection('users')}
          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeSection === 'users'
              ? 'bg-blue-900 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <i className="fas fa-users mr-2"></i>Usuarios
        </button>
      </nav>

      {activeSection === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon="fas fa-award" number="127" label="Total de Becas" />
            <StatCard icon="fas fa-file-alt" number="2,847" label="Solicitudes Recibidas" />
            <StatCard icon="fas fa-check-circle" number="1,235" label="Becas Otorgadas" />
            <StatCard icon="fas fa-dollar-sign" number="$15.2M" label="Presupuesto Ejercido" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Solicitudes por Estado</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>En Proceso</span>
                    <span>856 (30%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-900 transition-all" style={{width: '30%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Aprobadas</span>
                    <span>1,235 (43%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all" style={{width: '43%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Rechazadas</span>
                    <span>756 (27%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all" style={{width: '27%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Actividad Reciente</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-2 border-l-4 border-green-500">
                  <i className="fas fa-check-circle text-green-500 text-xl"></i>
                  <div>
                    <div className="font-semibold">Beca aprobada</div>
                    <div className="text-sm text-gray-600">Juan Pérez - Excelencia Académica</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border-l-4 border-blue-500">
                  <i className="fas fa-file-alt text-blue-500 text-xl"></i>
                  <div>
                    <div className="font-semibold">Nueva solicitud</div>
                    <div className="text-sm text-gray-600">María González - Apoyo Socioeconómico</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border-l-4 border-yellow-500">
                  <i className="fas fa-clock text-yellow-500 text-xl"></i>
                  <div>
                    <div className="font-semibold">Documentación pendiente</div>
                    <div className="text-sm text-gray-600">Carlos Ruiz - Innovación Tecnológica</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'scholarships' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Gestión de Becas</h3>
            <button className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-all">
              <i className="fas fa-plus mr-2"></i>Nueva Beca
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Nombre de la Beca</th>
                  <th className="px-6 py-4 text-left font-semibold">Institución</th>
                  <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                  <th className="px-6 py-4 text-left font-semibold">Monto</th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left font-semibold">Solicitudes</th>
                  <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">Beca de Excelencia Académica 2025</td>
                  <td className="px-6 py-4">Universidad de Guadalajara</td>
                  <td className="px-6 py-4">Excelencia</td>
                  <td className="px-6 py-4">$50,000</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">Activa</span>
                  </td>
                  <td className="px-6 py-4">234</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold">Ver</button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold">Editar</button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold">Eliminar</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">Programa de Apoyo Socioeconómico</td>
                  <td className="px-6 py-4">Fundación Telmex</td>
                  <td className="px-6 py-4">Socioeconómica</td>
                  <td className="px-6 py-4">$25,000</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">Activa</span>
                  </td>
                  <td className="px-6 py-4">567</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold">Ver</button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold">Editar</button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold">Eliminar</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'applications' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Solicitudes de Beca</h3>
            <select className="px-4 py-2 rounded-lg text-gray-900">
              <option>Todas las solicitudes</option>
              <option>En proceso</option>
              <option>Aprobadas</option>
              <option>Rechazadas</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Solicitante</th>
                  <th className="px-6 py-4 text-left font-semibold">Beca</th>
                  <th className="px-6 py-4 text-left font-semibold">Fecha</th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left font-semibold">Puntaje</th>
                  <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold">Juan Pérez García</div>
                    <div className="text-sm text-gray-600">juan.perez@alumnos.udg.mx</div>
                  </td>
                  <td className="px-6 py-4">Excelencia Académica</td>
                  <td className="px-6 py-4">15 Nov 2025</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">Aprobada</span>
                  </td>
                  <td className="px-6 py-4">95/100</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold">Ver</button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold">Evaluar</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'users' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Gestión de Usuarios</h3>
            <button className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-all">
              <i className="fas fa-plus mr-2"></i>Nuevo Usuario
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Usuario</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Rol</th>
                  <th className="px-6 py-4 text-left font-semibold">Estado</th>
                  <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold">Dr. Roberto Mendoza</div>
                    <div className="text-sm text-gray-600">Coordinador de Becas</div>
                  </td>
                  <td className="px-6 py-4">r.mendoza@udg.mx</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">Administrador</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">Activo</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-yellow-500 text-gray-900 rounded text-sm font-semibold">Ver</button>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm font-semibold">Editar</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal de Aplicación
const ApplicationModal = ({ isOpen, onClose, scholarship }) => {
  if (!isOpen || !scholarship) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-blue-900">Aplicar a {scholarship.title}</h3>
          <button onClick={onClose} className="text-2xl text-gray-600 hover:text-gray-900">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nombre Completo</label>
            <input type="text" placeholder="Tu nombre completo" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Código de Estudiante</label>
            <input type="text" placeholder="Tu código universitario" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Carrera</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option>Selecciona tu carrera</option>
              <option>Ingeniería en Sistemas</option>
              <option>Medicina</option>
              <option>Derecho</option>
              <option>Psicología</option>
              <option>Administración</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Promedio Actual</label>
            <input type="number" step="0.1" min="0" max="10" placeholder="9.5" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-semibold mb-2">Carta de Motivación</label>
            <textarea placeholder="Explica por qué mereces esta beca..." className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32"></textarea>
          </div>
          <div>
            <label className="block font-semibold mb-4">Documentos Requeridos</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Kardex oficial</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Comprobante de ingresos</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Carta de recomendación</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Identificación oficial</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end p-6 border-t border-gray-200">
          <button onClick={onClose} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all">
            Cancelar
          </button>
          <button className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all">
            Enviar Solicitud
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal de la App
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
    setCurrentPage(isAdmin ? 'home' : 'admin');
  };

  const handleApply = (scholarship) => {
    setSelectedScholarship(scholarship);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isAdmin={isAdmin} 
        toggleAdmin={toggleAdmin} 
      />

      <main className="max-w-7xl mx-auto px-6 pb-12">
        {currentPage === 'home' && !isAdmin && (
          <HomePage setCurrentPage={setCurrentPage} onApply={handleApply} />
        )}
        {currentPage === 'scholarships' && !isAdmin && (
          <ScholarshipsPage onApply={handleApply} />
        )}
        {currentPage === 'applications' && !isAdmin && (
          <ApplicationsPage />
        )}
        {currentPage === 'contact' && !isAdmin && (
          <ContactPage />
        )}
        {(currentPage === 'admin' || isAdmin) && (
          <AdminPanel />
        )}
      </main>

      <ApplicationModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        scholarship={selectedScholarship}
      />

      <footer className="text-center py-8 border-t border-gray-200 bg-white text-gray-600">
        <p>&copy; 2025 Universidad de Guadalajara. Todos los derechos reservados.</p>
        <p className="mt-1">Portal de Becas - Sistema de Gestión Integral</p>
      </footer>
    </div>
  );
}
import {} from "react";

// Componente ContactPage
export function ContactPage() {
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
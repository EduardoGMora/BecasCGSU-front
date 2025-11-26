import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EmailService } from '../services/emailService';
import { InfoCard } from '../components/InfoCard';
import { HeroCard } from '../components/HeroCard';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentCode: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!EmailService.isValidEmail(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData.subject) {
      newErrors.subject = 'Selecciona un asunto';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'El mensaje debe tener al menos 20 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Por favor corrige los errores en el formulario'
      });
      return;
    }

    // Iniciar proceso de envío
    setStatus({
      loading: true,
      success: false,
      error: false,
      message: 'Enviando mensaje...'
    });

    try {
      // Enviar email
      const result = await EmailService.sendContactForm(formData);

      if (result.success) {
        // Éxito
        setStatus({
          loading: false,
          success: true,
          error: false,
          message: result.message
        });

        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          phone: '',
          studentCode: '',
          subject: '',
          message: ''
        });

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: false, message: '' }));
        }, 5000);
      } else {
        // Error
        setStatus({
          loading: false,
          success: false,
          error: true,
          message: result.message
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Error inesperado al enviar el mensaje'
      });
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <HeroCard
        title="Contacto"
        subtitle="¿Tienes preguntas sobre las becas? Estamos aquí para ayudarte"
      />

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <InfoCard icon="fa-solid fa-phone" title="Teléfono">
          <p className="font-semibold mb-2 text-sm sm:text-base">Centro de Atención:</p>
          <p className="text-gray-600 mb-3 text-sm sm:text-base">33 3134-2222 ext. 12345</p>
          <p className="font-semibold mb-2 text-sm sm:text-base">Horario:</p>
          <p className="text-gray-600 text-sm sm:text-base">Lunes a Viernes 8:00 - 18:00</p>
        </InfoCard>
        
        <InfoCard icon="fa-solid fa-envelope" title="Email">
          <p className="font-semibold mb-2 text-sm sm:text-base">Becas UDG:</p>
          <a href="mailto:becas@udg.mx" className="text-blue-600 hover:underline mb-3 text-sm sm:text-base break-all">becas@udg.mx</a>
          <p className="font-semibold mb-2 text-sm sm:text-base">Soporte Técnico:</p>
          <a href="mailto:soporte.becas@udg.mx" className="text-blue-600 hover:underline text-sm sm:text-base break-all">soporte.becas@udg.mx</a>
        </InfoCard>
        
        <InfoCard icon="fa-solid fa-map-marker-alt" title="Ubicación">
          <p className="font-semibold mb-2 text-sm sm:text-base">Oficina de Becas:</p>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Av. Juárez No. 976<br />
            Col. Centro, Guadalajara, Jal.<br />
            C.P. 44100
          </p>
        </InfoCard>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon="fa-solid fa-paper-plane" className="text-2xl text-blue-900" />
          <h3 className="text-xl sm:text-2xl font-bold text-blue-900">Enviar Mensaje</h3>
        </div>

        {/* Status Messages */}
        {status.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <FontAwesomeIcon icon="fa-solid fa-check-circle" className="text-green-600 text-xl mt-0.5" />
            <div>
              <p className="text-green-800 font-semibold">¡Mensaje enviado!</p>
              <p className="text-green-700 text-sm">{status.message}</p>
            </div>
          </div>
        )}

        {status.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <FontAwesomeIcon icon="fa-solid fa-exclamation-circle" className="text-red-600 text-xl mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">Error al enviar</p>
              <p className="text-red-700 text-sm">{status.message}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base">
                <FontAwesomeIcon icon="fa-solid fa-user" className="mr-2 text-blue-900" />
                Nombre Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base">
                <FontAwesomeIcon icon="fa-solid fa-envelope" className="mr-2 text-blue-900" />
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu.correo@ejemplo.com"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone and Student Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base">
                <FontAwesomeIcon icon="fa-solid fa-phone" className="mr-2 text-blue-900" />
                Teléfono (Opcional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="33 1234 5678"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base">
                <FontAwesomeIcon icon="fa-solid fa-id-card" className="mr-2 text-blue-900" />
                Código de Estudiante (Opcional)
              </label>
              <input
                type="text"
                name="studentCode"
                value={formData.studentCode}
                onChange={handleChange}
                placeholder="2012345678"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base">
              <FontAwesomeIcon icon="fa-solid fa-tag" className="mr-2 text-blue-900" />
              Asunto <span className="text-red-500">*</span>
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona un tema</option>
              <option value="Información sobre becas">Información sobre becas</option>
              <option value="Estado de mi solicitud">Estado de mi solicitud</option>
              <option value="Documentación requerida">Documentación requerida</option>
              <option value="Problemas técnicos">Problemas técnicos</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block font-semibold mb-2 text-sm sm:text-base">
              <FontAwesomeIcon icon="fa-solid fa-comment" className="mr-2 text-blue-900" />
              Mensaje <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe tu consulta o problema..."
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg h-32 focus:outline-none focus:border-blue-500 text-sm sm:text-base resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Mínimo 20 caracteres ({formData.message.length}/20)
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              status.loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-900 hover:bg-blue-800 active:scale-95'
            } text-white`}
          >
            {status.loading ? (
              <>
                <FontAwesomeIcon icon="fa-solid fa-spinner" className="mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fa-solid fa-paper-plane" className="mr-2" />
                Enviar Mensaje
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
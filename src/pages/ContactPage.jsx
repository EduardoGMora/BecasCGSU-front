import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EmailService } from '../services/emailService';
import { InfoCard } from '../components/InfoCard';
import { HeroCard } from '../components/HeroCard';
import { FormField } from '../components/FormField';
import { isValidEmail, isNotEmpty } from '../utils/validators';
import { ERROR_MESSAGES } from '../constants';

/**
 * ContactPage component to display contact information and a contact form
 * @returns {JSX.Element} ContactPage component
 */
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

    if (!isNotEmpty(formData.name)) {
      newErrors.name = ERROR_MESSAGES.REQUIRED_FIELD;
    }

    if (!isNotEmpty(formData.email)) {
      newErrors.email = ERROR_MESSAGES.REQUIRED_FIELD;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    if (!formData.subject) {
      newErrors.subject = ERROR_MESSAGES.REQUIRED_FIELD;
    }

    if (!isNotEmpty(formData.message)) {
      newErrors.message = ERROR_MESSAGES.REQUIRED_FIELD;
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
        message: ERROR_MESSAGES.FORM_ERROR
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
    } catch (err) {
      console.error('Error al enviar:', err);
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Error inesperado al enviar el mensaje'
      });
    }
  };

  return (
    <>
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
          <FontAwesomeIcon icon="fa-solid fa-paper-plane" className="text-2xl text-[#F82890]" />
          <h3 className="text-xl sm:text-2xl font-bold text-[#F82890]">Enviar Mensaje</h3>
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
            <FormField
              label="Nombre Completo"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              icon="fa-solid fa-user"
              iconColor="text-[#BF51D8]" // Aquí pasas el color morado de Tailwind
              error={errors.name}
              required
            />
            <FormField
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu.correo@ejemplo.com"
              icon="fa-solid fa-envelope" iconColor="text-[#BF51D8]"
              error={errors.email}
              required
            />
          </div>

          {/* Phone and Student Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Teléfono (Opcional)"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="33 1234 5678"
              icon="fa-solid fa-phone" iconColor="text-[#BF51D8]"
              required={false}
            />

            <FormField
              label="Código de Estudiante (Opcional)"
              name="studentCode"
              type="text"
              value={formData.studentCode}
              onChange={handleChange}
              placeholder="2012345678"
              icon="fa-solid fa-id-card" iconColor="text-[#BF51D8]"
              required={false}
            />
          </div>

          {/* Subject */}
          <FormField
            label="Asunto"
            name="subject"
            type="select"
            value={formData.subject}
            onChange={handleChange}
            icon="fa-solid fa-tag" iconColor="text-[#BF51D8]"
            error={errors.subject}
            options={[
              "Información sobre becas",
              "Estado de mi solicitud",
              "Documentación requerida",
              "Problemas técnicos",
              "Otro"
            ]}
            required
          />

          {/* Message */}
          <FormField
            label="Mensaje"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe tu consulta o problema..."
            icon="fa-solid fa-comment" iconColor="text-[#BF51D8]"
            error={errors.message}
            helperText={`Mínimo 20 caracteres (${formData.message.length}/20)`}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status.loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${status.loading
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
    </>
  );
}
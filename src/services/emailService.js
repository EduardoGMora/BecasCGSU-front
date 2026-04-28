import emailjs from '@emailjs/browser';
import { 
  EMAILJS_SERVICE_ID, 
  EMAILJS_TEMPLATE_ID, 
  EMAILJS_PUBLIC_KEY 
} from '../config/emailjs.config';
import { isValidEmail } from '../utils/validators';

export class EmailService {
  static isValidEmail = isValidEmail;

  static async sendContactForm(formData) {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'No proporcionado',
        student_code: formData.studentCode || 'No proporcionado',
        subject: formData.subject,
        message: formData.message
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.'
        };
      } else {
        return {
          success: false,
          message: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.'
        };
      }
    } catch (error) {
      console.error('Error al enviar email:', error);
      return {
        success: false,
        message: 'Error al enviar el mensaje. Por favor, inténtalo más tarde.'
      };
    }
  }
}
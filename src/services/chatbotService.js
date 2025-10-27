// src/services/chatbotService.js
// Servicio para manejar la comunicación con el API del chatbot

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Servicio de ChatBot para integración con backend
 */
export class ChatBotService {
  /**
   * Envía un mensaje al chatbot y obtiene la respuesta
   * @param {string} message - Mensaje del usuario
   * @param {string} sessionId - ID de sesión del usuario
   * @param {object} context - Contexto adicional (usuario, beca actual, etc.)
   * @returns {Promise<object>} Respuesta del chatbot
   */
  static async sendMessage(message, sessionId, context = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          message,
          sessionId,
          context: {
            ...context,
            timestamp: new Date().toISOString(),
            platform: 'web'
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        message: data.message,
        suggestions: data.suggestions || [],
        actions: data.actions || []
      };
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      return {
        success: false,
        message: 'Lo siento, estoy teniendo problemas técnicos. Por favor, intenta de nuevo en unos momentos.',
        error: error.message
      };
    }
  }

  /**
   * Inicia una nueva sesión de chat
   * @param {object} userInfo - Información del usuario
   * @returns {Promise<string>} Session ID
   */
  static async startSession(userInfo = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/session/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          userInfo,
          timestamp: new Date().toISOString()
        })
      });

      const data = await response.json();
      return data.sessionId;
    } catch (error) {
      console.error('Error starting chat session:', error);
      // Generar un ID de sesión temporal si falla la API
      return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  /**
   * Finaliza una sesión de chat
   * @param {string} sessionId - ID de sesión
   */
  static async endSession(sessionId) {
    try {
      await fetch(`${API_BASE_URL}/chatbot/session/end`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          sessionId,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Error ending chat session:', error);
    }
  }

  /**
   * Obtiene el historial de mensajes de una sesión
   * @param {string} sessionId - ID de sesión
   * @returns {Promise<Array>} Array de mensajes
   */
  static async getHistory(sessionId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/chatbot/session/${sessionId}/history`,
        {
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`
          }
        }
      );

      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  }

  /**
   * Envía feedback sobre una respuesta del chatbot
   * @param {string} messageId - ID del mensaje
   * @param {boolean} helpful - Si fue útil o no
   * @param {string} comment - Comentario adicional
   */
  static async sendFeedback(messageId, helpful, comment = '') {
    try {
      await fetch(`${API_BASE_URL}/chatbot/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          messageId,
          helpful,
          comment,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  }

  /**
   * Obtiene sugerencias de preguntas frecuentes
   * @returns {Promise<Array>} Array de preguntas sugeridas
   */
  static async getSuggestedQuestions() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/chatbot/suggestions`,
        {
          headers: {
            'Authorization': `Bearer ${this.getAuthToken()}`
          }
        }
      );

      const data = await response.json();
      return data.questions || [];
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [
        '¿Qué becas están disponibles?',
        '¿Cuáles son los requisitos?',
        '¿Cómo aplico a una beca?',
        '¿Cuál es el estado de mi solicitud?'
      ];
    }
  }

  /**
   * Obtiene el token de autenticación
   * @private
   * @returns {string} Token de autenticación
   */
  static getAuthToken() {
    // Aquí deberías obtener el token del localStorage o contexto de autenticación
    return localStorage.getItem('authToken') || '';
  }

  /**
   * Procesa intenciones especiales del chatbot
   * @param {string} intent - Tipo de intención
   * @param {object} data - Datos adicionales
   * @returns {object} Acción a realizar
   */
  static processIntent(intent, data = {}) {
    const intentActions = {
      'navigate': (path) => ({ type: 'navigate', path }),
      'open_modal': (modalType) => ({ type: 'modal', modalType }),
      'search_scholarships': (filters) => ({ type: 'search', filters }),
      'contact_advisor': () => ({ type: 'contact' }),
      'show_status': () => ({ type: 'show_status' })
    };

    return intentActions[intent] ? intentActions[intent](data) : null;
  }
}

// Exportar constantes útiles
export const CHAT_EVENTS = {
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  SESSION_STARTED: 'session_started',
  SESSION_ENDED: 'session_ended',
  ERROR_OCCURRED: 'error_occurred'
};

export const CHAT_INTENTS = {
  LIST_SCHOLARSHIPS: 'list_scholarships',
  CHECK_STATUS: 'check_status',
  GET_REQUIREMENTS: 'get_requirements',
  CONTACT_ADVISOR: 'contact_advisor',
  APPLY_SCHOLARSHIP: 'apply_scholarship',
  GENERAL_INFO: 'general_info'
};
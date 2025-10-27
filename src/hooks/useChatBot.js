// src/hooks/useChatBot.js
import { useState, useEffect, useCallback } from 'react';
import { ChatBotService, CHAT_EVENTS } from '../services/chatbotService';

/**
 * Hook personalizado para manejar la lógica del chatbot
 * @param {object} options - Opciones de configuración
 * @returns {object} Estado y métodos del chatbot
 */
export const useChatBot = (options = {}) => {
  const {
    enableHistory = true,
    autoStart = true,
    onMessageReceived = null,
    userContext = {}
  } = options;

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  // Inicializar sesión
  useEffect(() => {
    if (autoStart && !sessionId) {
      initializeSession();
    }

    return () => {
      if (sessionId) {
        ChatBotService.endSession(sessionId);
      }
    };
  }, []);

  // Cargar historial si está habilitado
  useEffect(() => {
    if (enableHistory && sessionId && isConnected) {
      loadHistory();
    }
  }, [sessionId, isConnected]);

  /**
   * Inicializa una nueva sesión de chat
   */
  const initializeSession = async () => {
    try {
      const newSessionId = await ChatBotService.startSession(userContext);
      setSessionId(newSessionId);
      setIsConnected(true);
      
      // Mensaje de bienvenida
      addMessage({
        text: '¡Hola! Soy tu asistente virtual de becas. ¿En qué puedo ayudarte hoy?',
        sender: 'bot',
        timestamp: new Date()
      });

      emitEvent(CHAT_EVENTS.SESSION_STARTED, { sessionId: newSessionId });
    } catch (err) {
      setError('Error al iniciar la sesión');
      console.error('Session initialization error:', err);
    }
  };

  /**
   * Carga el historial de mensajes
   */
  const loadHistory = async () => {
    try {
      const history = await ChatBotService.getHistory(sessionId);
      if (history.length > 0) {
        setMessages(history);
      }
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  /**
   * Agrega un mensaje a la lista
   */
  const addMessage = useCallback((message) => {
    const newMessage = {
      id: Date.now(),
      ...message,
      timestamp: message.timestamp || new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  /**
   * Envía un mensaje al chatbot
   */
  const sendMessage = async (text) => {
    if (!text.trim() || !sessionId) return null;

    setError(null);

    // Agregar mensaje del usuario
    const userMessage = addMessage({
      text: text.trim(),
      sender: 'user'
    });

    emitEvent(CHAT_EVENTS.MESSAGE_SENT, userMessage);

    // Mostrar indicador de escritura
    setIsTyping(true);

    try {
      // Enviar al backend
      const response = await ChatBotService.sendMessage(
        text,
        sessionId,
        userContext
      );

      setIsTyping(false);

      if (response.success) {
        // Agregar respuesta del bot
        const botMessage = addMessage({
          text: response.message,
          sender: 'bot',
          suggestions: response.suggestions,
          actions: response.actions
        });

        emitEvent(CHAT_EVENTS.MESSAGE_RECEIVED, botMessage);

        if (onMessageReceived) {
          onMessageReceived(botMessage);
        }

        return botMessage;
      } else {
        throw new Error(response.error || 'Error al enviar mensaje');
      }
    } catch (err) {
      setIsTyping(false);
      setError('Error al enviar el mensaje');
      
      // Mensaje de error genérico
      const errorMessage = addMessage({
        text: 'Lo siento, estoy teniendo problemas técnicos. Por favor, intenta de nuevo.',
        sender: 'bot',
        isError: true
      });

      emitEvent(CHAT_EVENTS.ERROR_OCCURRED, { error: err.message });
      
      return errorMessage;
    }
  };

  /**
   * Envía feedback sobre un mensaje
   */
  const sendFeedback = async (messageId, helpful, comment) => {
    try {
      await ChatBotService.sendFeedback(messageId, helpful, comment);
    } catch (err) {
      console.error('Error sending feedback:', err);
    }
  };

  /**
   * Limpia el historial de mensajes
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    addMessage({
      text: '¡Hola! Soy tu asistente virtual de becas. ¿En qué puedo ayudarte hoy?',
      sender: 'bot'
    });
  }, [addMessage]);

  /**
   * Reinicia la sesión
   */
  const resetSession = async () => {
    if (sessionId) {
      await ChatBotService.endSession(sessionId);
    }
    setSessionId(null);
    setMessages([]);
    setError(null);
    await initializeSession();
  };

  /**
   * Emite eventos personalizados
   */
  const emitEvent = (eventName, data) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(`chatbot:${eventName}`, { detail: data })
      );
    }
  };

  return {
    // Estado
    messages,
    isTyping,
    sessionId,
    isConnected,
    error,

    // Métodos
    sendMessage,
    sendFeedback,
    clearMessages,
    resetSession,
    addMessage,

    // Utilidades
    messageCount: messages.length,
    hasError: !!error
  };
};

/**
 * Hook para escuchar eventos del chatbot
 * @param {string} eventName - Nombre del evento
 * @param {function} callback - Función callback
 */
export const useChatBotEvent = (eventName, callback) => {
  useEffect(() => {
    const handler = (event) => {
      callback(event.detail);
    };
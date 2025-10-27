import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente virtual de becas. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const quickActions = [
    { id: 1, text: '🎓 Ver becas disponibles', action: 'list_scholarships' },
    { id: 2, text: '📝 Estado de mi solicitud', action: 'check_status' },
    { id: 3, text: '❓ Requisitos generales', action: 'requirements' },
    { id: 4, text: '📞 Contactar asesor', action: 'contact_advisor' }
  ];

  // Simulación de respuesta del bot - aquí se integrará con tu API
  const getBotResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulación de delay de respuesta
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let botResponse = '';
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('beca') || lowerMessage.includes('disponible')) {
      botResponse = 'Actualmente tenemos 127 becas disponibles. Las más populares son:\n\n1. Beca de Excelencia Académica - $50,000\n2. Programa de Apoyo Socioeconómico - $25,000\n3. Beca de Innovación Tecnológica - $75,000\n\n¿Te gustaría saber más sobre alguna en específico?';
    } else if (lowerMessage.includes('requisito') || lowerMessage.includes('documento')) {
      botResponse = 'Los requisitos generales para solicitar una beca son:\n\n✓ Ser estudiante activo de la UdeG\n✓ Promedio mínimo de 8.0\n✓ Kardex actualizado\n✓ Comprobante de ingresos\n✓ Carta de motivos\n\n¿Necesitas ayuda con algún documento en particular?';
    } else if (lowerMessage.includes('solicitud') || lowerMessage.includes('estado')) {
      botResponse = 'Para revisar el estado de tu solicitud necesito tu código de estudiante. Por seguridad, te recomiendo iniciar sesión en el portal para ver esta información.';
    } else if (lowerMessage.includes('contacto') || lowerMessage.includes('asesor')) {
      botResponse = 'Puedes contactar a nuestros asesores:\n\n📞 Teléfono: 33 3134-2222 ext. 12345\n📧 Email: becas@udg.mx\n⏰ Horario: Lunes a Viernes 8:00-18:00\n\n¿Necesitas algo más?';
    } else {
      botResponse = 'Entiendo que necesitas ayuda. ¿Podrías ser más específico? Puedo ayudarte con:\n\n• Información sobre becas\n• Requisitos y documentación\n• Estado de solicitudes\n• Contacto con asesores';
    }

    setIsTyping(false);
    return botResponse;
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    const botResponseText = await getBotResponse(messageText);
    
    const botMessage = {
      id: messages.length + 2,
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickAction = (action) => {
    const actionTexts = {
      list_scholarships: 'Muéstrame las becas disponibles',
      check_status: '¿Cuál es el estado de mi solicitud?',
      requirements: '¿Qué requisitos necesito?',
      contact_advisor: 'Quiero contactar a un asesor'
    };

    handleSendMessage(actionTexts[action]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Botón flotante del chatbot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-blue-900 text-white rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'rotate-180' : ''
        }`}
        aria-label="Abrir chat"
      >
        <FontAwesomeIcon 
          icon={isOpen ? 'fa-solid fa-times' : 'fa-solid fa-comments'} 
          className="text-xl md:text-2xl"
        />
      </button>

      {/* Ventana del chat */}
      <div
        className={`fixed z-40 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'bottom-24 md:bottom-28 right-4 md:right-6 opacity-100 scale-100'
            : 'bottom-0 right-0 opacity-0 scale-95 pointer-events-none'
        } w-[calc(100vw-2rem)] md:w-96 max-w-md`}
      >
        <div className="bg-white rounded-lg shadow-2xl flex flex-col h-[calc(100vh-8rem)] md:h-[600px] max-h-[calc(100vh-8rem)]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 rounded-t-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon="fa-solid fa-robot" className="text-blue-900 text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base md:text-lg">Asistente Virtual</h3>
              <div className="flex items-center gap-2 text-xs md:text-sm opacity-90">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>En línea</span>
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-900 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm md:text-base whitespace-pre-line break-words">{message.text}</p>
                  <span className={`text-xs mt-1 block ${
                    message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-bl-none p-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-gray-200 bg-white">
              <p className="text-xs text-gray-600 mb-2 font-semibold">Acciones rápidas:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.action)}
                    className="text-xs md:text-sm p-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg transition-all text-left border border-blue-200"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm md:text-base"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="px-3 md:px-4 py-2 md:py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon icon="fa-solid fa-paper-plane" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Presiona Enter para enviar
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
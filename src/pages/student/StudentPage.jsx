import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import api from "../../api/axios"; 
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faSave, 
  faPen, 
  faEnvelope, 
  faIdCard, 
  faBookmark, 
  faArrowRight, 
  faTrash 
} from "@fortawesome/free-solid-svg-icons";

export const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [savedScholarships, setSavedScholarships] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    studentId: "",
    phone: "",
    major: "",
  });

  useEffect(() => {
    if (user) {
      // 1. Cargar datos del perfil
      setFormData({
        name: user.name || "",
        lastname: user.lastname || "",
        email: user.email || "",
        studentId: user.studentId || "20230000",
        phone: user.phone || "",
        major: user.major || "Ingeniería en Sistemas",
      });

      const mockSavedScholarships = [
        {
          id: 1,
          title: "Beca de Excelencia Académica",
          organization: "CGSU",
          amount: "$5,000",
          deadline: "2025-05-20",
          status: "Abierta"
        },
        {
          id: 2,
          title: "Apoyo al Transporte",
          organization: "Gobierno Estatal",
          amount: "$2,000",
          deadline: "2025-06-15",
          status: "Por cerrar"
        }
      ];
      setSavedScholarships(mockSavedScholarships);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Simulación de guardado
      console.log("Datos actualizados:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // await api.put(`/users/${user.id}`, formData); // Llamada real futura

      setMessage({ type: "success", text: "Información actualizada correctamente." });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error al guardar los cambios." });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveScholarship = (id) => {
    // Función para eliminar de guardados (Simulada)
    if(window.confirm("¿Deseas eliminar esta beca de tus guardados?")) {
        setSavedScholarships(prev => prev.filter(s => s.id !== id));
        // await api.delete(...)
    }
  };

  // Si no hay usuario logueado (por recarga sin persistencia)
  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-600">
      <p className="mb-4 text-lg">Sesión no encontrada.</p>
      <Link to="/login" className="text-blue-600 underline">Ir al Login</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      
      {/* TARJETA 1: INFORMACIÓN DEL PERFIL */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-6 flex flex-col md:flex-row justify-between items-center text-white gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white text-blue-600 p-4 rounded-full h-16 w-16 flex items-center justify-center text-2xl shadow-inner">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
              <p className="text-blue-100 text-sm">Gestiona tu información personal</p>
            </div>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition backdrop-blur-sm"
            >
              <FontAwesomeIcon icon={faPen} /> Editar Datos
            </button>
          )}
        </div>

        {message.text && (
          <div className={`p-4 text-center font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Datos No Editables */}
          <div className="col-span-1 md:col-span-2 bg-gray-50 p-5 rounded-xl border border-gray-200 mb-2">
            <h3 className="text-gray-500 font-bold mb-4 text-xs uppercase tracking-wider">Identificación Institucional</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Matrícula</label>
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed">
                  <FontAwesomeIcon icon={faIdCard} className="mr-3 text-gray-400"/>
                  {formData.studentId}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Institucional</label>
                <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-gray-400"/>
                  {formData.email}
                </div>
              </div>
            </div>
          </div>

          {/* Campos Editables */}
          {[
            { label: 'Nombre(s)', name: 'name', type: 'text' },
            { label: 'Apellidos', name: 'lastname', type: 'text' },
            { label: 'Teléfono', name: 'phone', type: 'tel' },
            { label: 'Carrera', name: 'major', type: 'text' }
          ].map((field) => (
             <div className="col-span-1" key={field.name}>
               <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
               <input
                 type={field.type}
                 name={field.name}
                 disabled={!isEditing}
                 value={formData[field.name]}
                 onChange={handleChange}
                 className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 ${
                   isEditing 
                     ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm' 
                     : 'bg-gray-50 border-gray-200 text-gray-600'
                 }`}
               />
             </div>
          ))}

          {isEditing && (
            <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsEditing(false); setMessage({type:"", text:""}); }}
                className="px-5 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {loading ? 'Guardando...' : <><FontAwesomeIcon icon={faSave} /> Guardar Cambios</>}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* TARJETA 2: BECAS GUARDADAS */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 text-white" >
        <div className="bg-gray-800 p-6 flex items-center gap-3 text-white">
            <FontAwesomeIcon icon={faBookmark} className="text-yellow-400 text-xl" />
            <h2 className="text-xl font-bold">Mis Becas Guardadas</h2>
        </div>
        
        <div className="p-6">
            {savedScholarships.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No tienes becas guardadas aún.</p>
                    <Link to="/becas" className="text-blue-600 hover:underline mt-2 inline-block">
                        Explorar becas disponibles
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {savedScholarships.map((beca) => (
                        <div key={beca.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-white flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                        {beca.status}
                                    </span>
                                    <button 
                                        onClick={() => handleRemoveScholarship(beca.id)}
                                        className="text-gray-400 hover:text-red-500 transition"
                                        title="Eliminar de guardados"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{beca.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{beca.organization}</p>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p>💰 <span className="font-semibold text-gray-700">{beca.amount}</span></p>
                                    <p>📅 Cierre: {beca.deadline}</p>
                                </div>
                            </div>
                            
                            <Link 
                                to={`/becas/${beca.id}`} 
                                className="mt-4 w-full block text-center bg-gray-50 text-blue-600 border border-blue-200 py-2 rounded hover:bg-blue-50 font-medium transition text-sm"
                            >
                                Ver Detalles <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-xs"/>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

    </div>
  );
};
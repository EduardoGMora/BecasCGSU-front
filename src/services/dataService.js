import mockData from '../data/mockData.json';

/**
 * Servicio de datos mock
 * Este archivo simula llamadas a una API y puede ser fácilmente reemplazado
 * con llamadas reales a un backend cuando esté disponible.
 * 
 * Para migrar a API real:
 * 1. Reemplazar las funciones que retornan mockData con fetch/axios
 * 2. Mantener la misma estructura de datos en las respuestas
 * 3. Agregar manejo de errores y estados de carga
 */

// Simula delay de red (opcional, para testing)
const simulateNetworkDelay = (ms = 100) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// ==================== SCHOLARSHIPS ====================

/**
 * Obtiene todas las becas
 * TODO: Reemplazar con: GET /api/scholarships
 */
export const getScholarships = async () => {
  await simulateNetworkDelay();
  return mockData.scholarships;
};

/**
 * Obtiene una beca por ID
 * TODO: Reemplazar con: GET /api/scholarships/:id
 */
export const getScholarshipById = async (id) => {
  await simulateNetworkDelay();
  return mockData.scholarships.find(s => s.id === parseInt(id));
};

/**
 * Crea una nueva beca
 * TODO: Reemplazar con: POST /api/scholarships
 */
export const createScholarship = async (scholarshipData) => {
  await simulateNetworkDelay();
  const newScholarship = {
    id: mockData.scholarships.length + 1,
    ...scholarshipData
  };
  mockData.scholarships.push(newScholarship);
  return newScholarship;
};

/**
 * Actualiza una beca existente
 * TODO: Reemplazar con: PUT /api/scholarships/:id
 */
export const updateScholarship = async (id, scholarshipData) => {
  await simulateNetworkDelay();
  const index = mockData.scholarships.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    mockData.scholarships[index] = { ...mockData.scholarships[index], ...scholarshipData };
    return mockData.scholarships[index];
  }
  throw new Error('Scholarship not found');
};

/**
 * Elimina una beca
 * TODO: Reemplazar con: DELETE /api/scholarships/:id
 */
export const deleteScholarship = async (id) => {
  await simulateNetworkDelay();
  const index = mockData.scholarships.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    mockData.scholarships.splice(index, 1);
    return true;
  }
  return false;
};

// ==================== APPLICATIONS ====================

/**
 * Obtiene todas las solicitudes
 * TODO: Reemplazar con: GET /api/applications
 */
export const getApplications = async () => {
  await simulateNetworkDelay();
  return mockData.applications;
};

/**
 * Obtiene una solicitud por ID
 * TODO: Reemplazar con: GET /api/applications/:id
 */
export const getApplicationById = async (id) => {
  await simulateNetworkDelay();
  return mockData.applications.find(a => a.id === id);
};

/**
 * Crea una nueva solicitud
 * TODO: Reemplazar con: POST /api/applications
 */
export const createApplication = async (applicationData) => {
  await simulateNetworkDelay();
  const newApplication = {
    id: `APP-2024-${String(mockData.applications.length + 1).padStart(3, '0')}`,
    status: 'pending',
    applicationDate: new Date().toISOString().split('T')[0],
    ...applicationData
  };
  mockData.applications.push(newApplication);
  return newApplication;
};

/**
 * Actualiza una solicitud existente
 * TODO: Reemplazar con: PUT /api/applications/:id
 */
export const updateApplication = async (id, applicationData) => {
  await simulateNetworkDelay();
  const index = mockData.applications.findIndex(a => a.id === id);
  if (index !== -1) {
    mockData.applications[index] = { ...mockData.applications[index], ...applicationData };
    return mockData.applications[index];
  }
  throw new Error('Application not found');
};

/**
 * Evalúa una solicitud
 * TODO: Reemplazar con: POST /api/applications/:id/evaluate
 */
export const evaluateApplication = async (id, evaluationData) => {
  await simulateNetworkDelay();
  const index = mockData.applications.findIndex(a => a.id === id);
  if (index !== -1) {
    const evaluation = {
      date: new Date().toISOString().split('T')[0],
      evaluator: evaluationData.evaluator || 'Sistema',
      action: 'Evaluación',
      comments: evaluationData.comments
    };
    
    mockData.applications[index].evaluationHistory = [
      ...(mockData.applications[index].evaluationHistory || []),
      evaluation
    ];
    
    if (evaluationData.academicScore !== undefined) {
      mockData.applications[index].academicScore = evaluationData.academicScore;
    }
    if (evaluationData.economicScore !== undefined) {
      mockData.applications[index].economicScore = evaluationData.economicScore;
    }
    if (evaluationData.motivationScore !== undefined) {
      mockData.applications[index].motivationScore = evaluationData.motivationScore;
    }
    
    return mockData.applications[index];
  }
  throw new Error('Application not found');
};

// ==================== USERS ====================

/**
 * Obtiene todos los usuarios
 * TODO: Reemplazar con: GET /api/users
 */
export const getUsers = async () => {
  await simulateNetworkDelay();
  return mockData.users;
};

/**
 * Obtiene un usuario por ID
 * TODO: Reemplazar con: GET /api/users/:id
 */
export const getUserById = async (id) => {
  await simulateNetworkDelay();
  return mockData.users.find(u => u.id === parseInt(id));
};

/**
 * Crea un nuevo usuario
 * TODO: Reemplazar con: POST /api/users
 */
export const createUser = async (userData) => {
  await simulateNetworkDelay();
  const newUser = {
    id: mockData.users.length + 1,
    registrationDate: new Date().toISOString().split('T')[0],
    lastAccess: new Date().toISOString().replace('T', ' ').substring(0, 16),
    recentActivity: [],
    ...userData
  };
  mockData.users.push(newUser);
  return newUser;
};

/**
 * Actualiza un usuario existente
 * TODO: Reemplazar con: PUT /api/users/:id
 */
export const updateUser = async (id, userData) => {
  await simulateNetworkDelay();
  const index = mockData.users.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    mockData.users[index] = { ...mockData.users[index], ...userData };
    return mockData.users[index];
  }
  throw new Error('User not found');
};

/**
 * Elimina un usuario
 * TODO: Reemplazar con: DELETE /api/users/:id
 */
export const deleteUser = async (id) => {
  await simulateNetworkDelay();
  const index = mockData.users.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    mockData.users.splice(index, 1);
    return true;
  }
  return false;
};

// ==================== EVALUATION CRITERIA ====================

/**
 * Obtiene los criterios de evaluación
 * TODO: Reemplazar con: GET /api/evaluation-criteria
 */
export const getEvaluationCriteria = async () => {
  await simulateNetworkDelay();
  return mockData.evaluationCriteria;
};

// ==================== EXPORTS ====================

export default {
  // Scholarships
  getScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  
  // Applications
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  evaluateApplication,
  
  // Users
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  
  // Evaluation
  getEvaluationCriteria
};

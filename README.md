# 🎓 Portal de Becas CGSU - Frontend

Sistema web para la gestión de becas de la Universidad de Guadalajara y instituciones colaboradoras.

## 🚀 Stack Tecnológico

- **React 19.1** - Framework UI
- **Vite 7.1** - Build tool y dev server
- **React Router v7** - Navegación
- **Tailwind CSS 3.4** - Estilos
- **Axios** - Cliente HTTP
- **EmailJS** - Servicio de correos
- **Font Awesome** - Iconos

## 📁 Estructura del Proyecto

```
src/
├── api/              # Configuración de Axios y API clients
├── assets/           # Recursos estáticos (imágenes, logos)
├── components/       # Componentes React reutilizables
├── config/           # Archivos de configuración
├── constants/        # Constantes de la aplicación
├── context/          # Context API (estado global)
├── hooks/            # Custom hooks
├── layouts/          # Layouts de páginas
├── mocks/            # Datos de prueba (JSON mock data)
├── pages/            # Páginas/vistas de la aplicación
├── routes/           # Configuración de rutas
├── services/         # Servicios de negocio
├── utils/            # Funciones utilitarias (validators, formatters)
└── main.jsx          # Punto de entrada
```

## ⚙️ Configuración Inicial

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_CONTACT=tu_template_id
VITE_EMAILJS_TEMPLATE_APP=tu_template_app_id

# API Configuration
VITE_API_URL=http://localhost:8000

# Environment
VITE_ENV=development
```

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Scripts Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Crear build de producción
npm run preview  # Preview del build de producción
npm run lint     # Ejecutar ESLint
```

## 🎯 Características

- ✅ Sistema de autenticación con roles (estudiante, admin, subadmin)
- ✅ Gestión de becas y solicitudes
- ✅ Filtros y búsqueda avanzada
- ✅ Chatbot de asistencia
- ✅ Formulario de contacto con EmailJS
- ✅ Diseño responsive con Tailwind CSS
- ✅ Rutas protegidas por rol
- ✅ Interceptores HTTP para manejo de tokens

## 🔐 Roles de Usuario

- **Estudiante** (`student`) - Puede ver becas y enviar solicitudes
- **Admin** (`admin`) - Panel de administración completo
- **SubAdmin** (`subadmin`) - Panel de administración limitado

## 🚨 Notas de Seguridad

⚠️ **IMPORTANTE**: Este proyecto actualmente usa datos mock para desarrollo. Para producción:

1. **Implementar autenticación real con backend**
   - Usar JWT tokens
   - Almacenar tokens de forma segura
   - Implementar refresh tokens

2. **Eliminar datos mock**
   - ✅ Archivos JSON movidos de `/src/utils` a `/src/mocks`
   - Conectar con API real para producción

3. **Variables de entorno**
   - No commitear archivos `.env`
   - Usar variables de entorno del servidor en producción

## 📝 Próximas Mejoras

### Prioritarias
- [ ] Implementar autenticación real (JWT)
- [ ] Conectar con backend real
- [ ] Agregar error boundaries
- [ ] Implementar loading states globales
- [ ] Agregar tests unitarios

### Mejoras de UX
- [ ] Skeleton loaders
- [ ] Toast notifications
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] PWA support

### Optimizaciones
- [ ] Code splitting por rutas
- [ ] Lazy loading de componentes pesados
- [ ] Optimización de imágenes
- [ ] Service Worker para caché

## 🧪 Testing

```bash
# TO DO: Implementar tests
npm run test
```

## 📦 Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en `/dist`

## 🤝 Contribuir

1. Crea una rama desde `main`: `git checkout -b feature/nueva-funcionalidad`
2. Haz tus cambios
3. Commit: `git commit -m "feat: descripción del cambio"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan la lógica)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

## 📄 Licencia

[Especificar licencia]

## 👥 Equipo

[Información del equipo de desarrollo]

## 📞 Contacto

Para dudas o soporte: becas@udg.mx

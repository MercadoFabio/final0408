# Examen Práctico: Autenticación y Consulta de Datos en Angular (v18 Standalone)

## ⏰ Tiempo Límite: 90 minutos

## 📋 Objetivo

Desarrollar una mini-aplicación en Angular 18 (con componentes **standalone**) que implemente un flujo de autenticación de usuarios y la visualización de datos en una ruta protegida.

## 🛠️ Requerimientos Técnicos

- Angular CLI 18.x (arquitectura Standalone)
- JSON Server
- Bootstrap 5.x (ya incluido)

## 🚀 Instrucciones de Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm start
```

### 3. Iniciar JSON Server (en otra terminal)
```bash
npm run api
```

La aplicación estará disponible en `http://localhost:4200` y el API en `http://localhost:3000`.

## ✅ Tareas a Completar

### 1. AuthService (`src/app/services/auth.service.ts`)

**Métodos a implementar:**

#### `login(email: string, password: string): Observable<User>`
- Hacer petición `GET` a `http://localhost:3000/users` con email y password como query params
- Si la API devuelve un usuario (array con un elemento), el login es exitoso
- Guardar el `id` del usuario en `localStorage` como "token"
- Retornar Observable con el usuario encontrado o error

#### `logout(): void`
- Eliminar el "token" del `localStorage`

#### `isAuthenticated(): boolean`
- Verificar si existe "token" en `localStorage`
- Retornar `true` si existe, `false` en caso contrario

### 2. LoginComponent (`src/app/components/login/login.component.ts`)

#### `ngOnInit()`
- Crear FormGroup con campos `email` y `password`
- Ambos campos son requeridos
- Email debe tener validación de email
- Password debe tener validación de longitud mínima (6 caracteres)

#### `onSubmit()`
- Verificar si el formulario es válido
- Llamar a `authService.login()` con los valores del formulario
- Si login exitoso: redirigir a `/profile`
- Si login falla: mostrar mensaje de error

### 3. AuthGuard (`src/app/guards/auth.guard.ts`)

#### Implementar guard funcional
- Inyectar `AuthService` y `Router` usando `inject()`
- Verificar si el usuario está autenticado
- Si está autenticado: permitir acceso (`return true`)
- Si no está autenticado: redirigir a `/login` y bloquear acceso (`return false`)

### 4. ProfileComponent (`src/app/components/profile/profile.component.ts`)

#### `ngOnInit()`
- Obtener el ID del usuario desde `authService.getCurrentUserId()`
- Si existe ID: llamar a `loadUserProfile()`
- Si no existe ID: redirigir a `/login`

#### `loadUserProfile()`
- Usar `userService.getUserById()` para obtener datos del usuario
- Asignar los datos a la propiedad `user`
- Manejar errores apropiadamente

#### `logout()`
- Llamar a `authService.logout()`
- Redirigir a `/login`

## 🔐 Credenciales de Prueba

| Email | Password | Rol |
|-------|----------|-----|
| ana.martinez@empresa.com | password123 | Manager |
| javier.gomez@empresa.com | password456 | Developer |
| sofia.castro@empresa.com | password789 | Designer |

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── login/           # Componente de login (a completar)
│   │   └── profile/         # Componente de perfil (a completar)
│   ├── services/
│   │   ├── auth.service.ts  # Servicio de autenticación (a completar)
│   │   └── user.service.ts  # Servicio de usuarios (implementado)
│   ├── guards/
│   │   └── auth.guard.ts    # Guard de autenticación (a completar)
│   ├── interfaces/
│   │   └── user.interface.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts        # Rutas pre-configuradas
├── styles.css               # Estilos globales
└── main.ts
```

## 🎯 Criterios de Evaluación

1. **Funcionalidad** (40 puntos)
   - Login funcional
   - Protección de rutas
   - Visualización de perfil
   - Logout funcional

2. **Código** (30 puntos)
   - Implementación correcta de servicios
   - Uso apropiado de formularios reactivos
   - Manejo de errores

3. **UX/UI** (20 puntos)
   - Validaciones de formulario
   - Mensajes de error apropiados
   - Estados de carga

4. **Buenas Prácticas** (10 puntos)
   - Código limpio y comentado
   - Tipado TypeScript
   - Estructura del proyecto

## 💡 Tips

- Los templates HTML y CSS ya están implementados
- Los métodos auxiliares están disponibles
- Usa las herramientas de desarrollo del navegador para debugging
- Revisa la documentación de Angular para formularios reactivos
- Los comentarios TODO indican exactamente qué implementar

## 🚨 Puntos Importantes

- **NO modifiques** los archivos de configuración (package.json, angular.json, etc.)
- **NO modifiques** las rutas en `app.routes.ts`
- **NO modifiques** los templates HTML
- Concéntrate solo en la lógica TypeScript de los componentes y servicios

## 📞 Ayuda

Si tienes dudas técnicas sobre la configuración del proyecto, consulta con el instructor. Las dudas sobre la implementación deben resolverse de forma independiente.

¡Buena suerte! 🚀 
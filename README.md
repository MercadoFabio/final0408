# Examen Final: Implementación de Autenticación en Angular

## Objetivo

Evaluar la capacidad para implementar un flujo de autenticación completo en una aplicación Angular 18 (standalone). 
Esto incluye la creación de formularios reactivos, la comunicación con una API, la gestión del estado de autenticación, 
la protección de rutas con Guards funcionales y la navegación entre componentes.

## Tiempo Límite

*   *60 Minutos*

## Reglas y Condiciones

1.  *Prohibido el uso de IA:* Queda estrictamente prohibido el uso de cualquier herramienta de inteligencia artificial, incluyendo, pero no limitado a, GitHub Copilot, ChatGPT, Bard, etc.
2.  *Desactivar Ayudas del Editor:* Debes desactivar las extensiones de autocompletado avanzado y sugerencias de código de tu editor (VS Code, WebStorm, etc.). Se permite el autocompletado básico del lenguaje TypeScript y HTML.
3.  *No Consultar Fuentes Externas:* No se permite buscar soluciones en Google, Stack Overflow, documentación oficial de Angular o cualquier otro recurso externo. Todo el código debe ser producto de tu propio conocimiento.
4.  *Enfoque en la Lógica:* El proyecto base ya incluye la estructura de archivos, el HTML y los estilos. Tu única tarea es implementar la lógica de TypeScript en los lugares marcados con // TODO:.

---

## Preparación del Entorno

1.  Abre una terminal en la raíz del proyecto.
2.  Instala las dependencias con el comando:
    bash
    npm install

3.  En una *segunda terminal*, inicia el servidor de la API simulada con:
    bash
    npm run api

    Esto ejecutará json-server --watch db.json. La API estará disponible en http://localhost:3000.
4.  En la *primera terminal*, inicia la aplicación de Angular con:
    bash
    ng serve -o


---

## Tareas a Implementar

Tu trabajo consiste en completar la lógica en los archivos donde encuentres un comentario // TODO:. A continuación se detalla qué se espera en cada sección y su puntuación.

### 1. auth.service.ts (30 Puntos)

#### Tareas:
*   **login(email, password) (15 Puntos):**
  *   Debe realizar una petición GET a http://localhost:3000/users usando HttpClient.
  *   Debe incluir email y password como HttpParams.
  *   Si la respuesta es un array con un usuario, debe guardar el id de ese usuario en localStorage con la clave 'auth_token'.
  *   Debe retornar un Observable<User> que emita el usuario si tiene éxito o un error en caso contrario (puedes usar map y tap de RxJS).
*   **logout() (5 Puntos):**
  *   Debe eliminar la clave 'auth_token' del localStorage.
*   **isAuthenticated() (10 Puntos):**
  *   Debe retornar true si existe un 'auth_token' en localStorage, y false si no.

### 2. login.component.ts (30 Puntos)

#### Tareas:
*   **ngOnInit() (10 Puntos):**
  *   Debes inicializar loginForm usando FormBuilder.
  *   El FormGroup debe contener los controles email y password.
  *   Añadir las validaciones:
    *   email: Requerido y con formato de email (Validators.required, Validators.email).
    *   password: Requerido y con una longitud mínima de 6 caracteres (Validators.required, Validators.minLength(6)).
*   **onSubmit() (20 Puntos):**
  *   Debe verificar si loginForm.valid es true.
  *   Si el formulario es inválido, no debe hacer nada (el HTML ya muestra los errores).
  *   Si es válido, debe llamar a authService.login().
  *   Al recibir una respuesta exitosa, debe navegar a la ruta /profile.
  *   Debe manejar los errores de la llamada al servicio, asignando un mensaje a la propiedad errorMessage.
  *   Debe gestionar el estado de carga (isLoading).

### 3. profile.component.ts (20 Puntos)

#### Tareas:
*   **ngOnInit() (5 Puntos):**
  *   Debe obtener el ID del usuario llamando a authService.getCurrentUserId().
  *   Si se obtiene un ID, debe llamar al método loadUserProfile(id).
  *   Si no hay ID, debe redirigir al usuario a /login.
*   **loadUserProfile(id) (10 Puntos):**
  *   Este método debe llamar a userService.getUserById(id).
  *   Debe suscribirse al Observable y asignar el usuario recibido a this.user.
  *   Debe manejar el estado de carga (isLoading) y los posibles errores (errorMessage).
*   **logout() (5 Puntos):**
  *   Debe llamar a authService.logout().
  *   Debe redirigir al usuario a /login.

### 4. auth.guard.ts (10 Puntos)

#### Tareas:
*   **authGuard (10 Puntos):**
  *   Implementar la función CanActivateFn.
  *   Usar inject(AuthService) e inject(Router) para obtener las instancias de los servicios.
  *   Llamar a authService.isAuthenticated().
  *   Si devuelve true, el guard debe retornar true.
  *   Si devuelve false, debe redirigir al usuario a /login usando router.navigate() y luego retornar false.

### 5. app.routes.ts (10 Puntos)

#### Tareas:
*   *Definir Rutas (10 Puntos):*
*   Crear una ruta para path: 'login' que cargue LoginComponent.
*   Crear una ruta para path: 'profile' que cargue ProfileComponent, esté protegida por el authGuard y utilice lazy loading.
*   Crear una ruta por defecto (path: '') que redirija a /profile.
*   Crear una ruta comodín (path: '**') que cargue NotFoundComponent para manejar rutas inexistentes.
---

## Tabla de Puntuación Resumida

| Tarea | Puntos |
| :--- | :--- |
| AuthService | 30 |
| LoginComponent | 30 |
| ProfileComponent | 20 |
| auth.guard.ts | 10 |
| app.routes.ts | 10 |
| *Total* | *100* |

*¡Mucha suerte!*

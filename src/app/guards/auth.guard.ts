import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * TODO: IMPLEMENTAR - Guard funcional para proteger rutas
 * Instrucciones:
 * 1. Inyectar AuthService y Router usando inject()
 * 2. Verificar si el usuario está autenticado usando authService.isAuthenticated()
 * 3. Si está autenticado, permitir acceso (return true)
 * 4. Si no está autenticado, redirigir a /login y bloquear acceso (return false)
 */
export const authGuard: CanActivateFn = (route, state) => {
    // TODO: Inyectar servicios necesarios

    // TODO: Implementar lógica de verificación
    // Verificar si usuario está autenticado
    // Si está autenticado: return true
    // Si no está autenticado: redirigir a login y return false

    return false; // Cambiar por la lógica correcta
};

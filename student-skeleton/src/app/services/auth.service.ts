import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/users';
    private tokenKey = 'auth_token';

    constructor(private http: HttpClient) { }

    /**
     * TODO: IMPLEMENTAR - Método para autenticar usuario
     * Instrucciones:
     * 1. Hacer petición GET a http://localhost:3000/users con email y password como query params
     * 2. Si la API devuelve un usuario (array con un elemento), login exitoso
     * 3. Guardar el ID del usuario en localStorage como "token"
     * 4. Retornar Observable con el usuario encontrado o error
     */
    login(email: string, password: string): Observable<User> {
        // TODO: Implementar lógica de login
        // Crear HttpParams con email y password
        // Hacer petición GET al API
        // Procesar respuesta y guardar token si es exitoso
        throw new Error('Método login no implementado');
    }

    /**
     * TODO: IMPLEMENTAR - Método para cerrar sesión
     * Instrucciones:
     * 1. Eliminar el token del localStorage
     */
    logout(): void {
        // TODO: Implementar lógica de logout
        // Eliminar token del localStorage
    }

    /**
     * TODO: IMPLEMENTAR - Método para verificar autenticación
     * Instrucciones:
     * 1. Verificar si existe token en localStorage
     * 2. Retornar true si existe, false si no
     */
    isAuthenticated(): boolean {
        // TODO: Implementar verificación de autenticación
        // Verificar si existe token en localStorage
        return false;
    }

    /**
     * Método auxiliar para obtener el ID del usuario actual
     * (Ya implementado para ayuda)
     */
    getCurrentUserId(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
} 
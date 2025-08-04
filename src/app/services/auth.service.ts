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
     * Método para autenticar usuario
     * Hace petición GET a /users con email y password como query params
     */
    login(email: string, password: string): Observable<User> {
        const params = new HttpParams()
            .set('email', email)
            .set('password', password);

        return this.http.get<User[]>(this.apiUrl, { params }).pipe(
            map(users => {
                if (users && users.length > 0) {
                    const user = users[0];
                    // Guardar el ID del usuario como "token" en localStorage
                    localStorage.setItem(this.tokenKey, user.id);
                    return user;
                } else {
                    throw new Error('Credenciales incorrectas');
                }
            }),
            catchError(error => {
                return throwError(() => new Error('Credenciales incorrectas'));
            })
        );
    }

    /**
     * Método para cerrar sesión
     * Elimina el token del localStorage
     */
    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    /**
     * Método para verificar si el usuario está autenticado
     * Verifica si existe token en localStorage
     */
    isAuthenticated(): boolean {
        return localStorage.getItem(this.tokenKey) !== null;
    }

    /**
     * Método para obtener el ID del usuario actual
     */
    getCurrentUserId(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
} 
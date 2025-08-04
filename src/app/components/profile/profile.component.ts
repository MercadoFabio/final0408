import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import {User} from "../../interfaces/user.interface";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: User | null = null;
    isLoading = true;
    errorMessage = '';

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private router: Router
    ) { }

    /**
     * TODO: IMPLEMENTAR - Método ngOnInit
     * Instrucciones:
     * 1. Obtener el ID del usuario desde authService.getCurrentUserId()
     * 2. Si existe ID: llamar a loadUserProfile()
     * 3. Si no existe ID: redirigir a /login
     */
    ngOnInit(): void {
        // TODO: Implementar lógica de inicialización
        // Obtener ID del usuario actual
        // Cargar perfil del usuario o redirigir a login si no hay ID
        console.log('TODO: Implementar ngOnInit');
    }

    /**
     * TODO: IMPLEMENTAR - Método para cargar datos del usuario
     * Instrucciones:
     * 1. Obtener ID del usuario desde authService
     * 2. Usar userService.getUserById() para obtener datos
     * 3. Asignar datos a la propiedad 'user'
     * 4. Manejar errores apropiadamente
     */
    private loadUserProfile(): void {
        // TODO: Implementar carga del perfil
        // Obtener ID del usuario
        // Llamar a userService.getUserById()
        // Asignar resultado a this.user
        // Manejar errores y estados de carga
        console.log('TODO: Implementar loadUserProfile');
    }

    /**
     * TODO: IMPLEMENTAR - Método para cerrar sesión
     * Instrucciones:
     * 1. Llamar a authService.logout()
     * 2. Redirigir al usuario a /login
     */
    logout(): void {
        // TODO: Implementar logout
        // Llamar a authService.logout()
        // Redirigir a /login
        console.log('TODO: Implementar logout');
    }

    // Métodos auxiliares ya implementados para facilitar el desarrollo
    getRoleClass(role: string): string {
        switch (role?.toLowerCase()) {
            case 'manager':
                return 'badge bg-success';
            case 'developer':
                return 'badge bg-primary';
            case 'designer':
                return 'badge bg-warning text-dark';
            default:
                return 'badge bg-secondary';
        }
    }

    getRoleIcon(role: string): string {
        switch (role?.toLowerCase()) {
            case 'manager':
                return '👔';
            case 'developer':
                return '💻';
            case 'designer':
                return '🎨';
            default:
                return '👤';
        }
    }
}

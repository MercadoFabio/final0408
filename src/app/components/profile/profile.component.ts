import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

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

    ngOnInit(): void {
        this.loadUserProfile();
    }

    /**
     * Cargar datos del perfil del usuario
     */
    private loadUserProfile(): void {
        const userId = this.authService.getCurrentUserId();

        if (userId) {
            this.userService.getUserById(userId).subscribe({
                next: (user) => {
                    this.user = user;
                    this.isLoading = false;
                },
                error: (error) => {
                    this.errorMessage = 'Error al cargar los datos del perfil';
                    this.isLoading = false;
                    console.error('Error loading user profile:', error);
                }
            });
        } else {
            // No hay usuario logueado, redirigir a login
            this.router.navigate(['/login']);
        }
    }

    /**
     * Cerrar sesión del usuario
     */
    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    /**
     * Obtener clase CSS según el rol del usuario
     */
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

    /**
     * Obtener icono según el rol del usuario
     */
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
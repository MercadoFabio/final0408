import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    errorMessage = '';
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Crear formulario con validaciones
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        // Si ya está autenticado, redirigir al perfil
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/profile']);
        }
    }

    /**
     * Método para manejar el envío del formulario
     */
    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const { email, password } = this.loginForm.value;

            this.authService.login(email, password).subscribe({
                next: (user) => {
                    this.isLoading = false;
                    // Login exitoso, redirigir al perfil
                    this.router.navigate(['/profile']);
                },
                error: (error) => {
                    this.isLoading = false;
                    this.errorMessage = 'Credenciales incorrectas';
                }
            });
        } else {
            // Marcar todos los campos como tocados para mostrar errores
            this.markFormGroupTouched();
        }
    }

    /**
     * Marcar todos los campos del formulario como tocados
     */
    private markFormGroupTouched(): void {
        Object.keys(this.loginForm.controls).forEach(key => {
            const control = this.loginForm.get(key);
            control?.markAsTouched();
        });
    }

    /**
     * Verificar si un campo tiene errores y ha sido tocado
     */
    isFieldInvalid(fieldName: string): boolean {
        const field = this.loginForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }

    /**
     * Obtener mensaje de error para un campo específico
     */
    getFieldError(fieldName: string): string {
        const field = this.loginForm.get(fieldName);

        if (field?.errors) {
            if (field.errors['required']) {
                return `El campo ${fieldName} es requerido`;
            }
            if (field.errors['email']) {
                return 'Ingrese un email válido';
            }
            if (field.errors['minlength']) {
                return `El campo debe tener al menos ${field.errors['minlength'].requiredLength} caracteres`;
            }
        }
        return '';
    }
} 
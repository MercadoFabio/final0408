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
        /**
         * TODO: IMPLEMENTAR - Crear formulario con validaciones
         * Instrucciones:
         * 1. Crear FormGroup con campos 'email' y 'password'
         * 2. Agregar validaciones: ambos campos requeridos
         * 3. Para email: también agregar validación de email
         * 4. Para password: también agregar validación de longitud mínima (6 caracteres)
         */

        // TODO: Crear formulario usando FormBuilder
        // this.loginForm = this.fb.group({
        //   email: ['', [Validators.required, Validators.email]],
        //   password: ['', [Validators.required, Validators.minLength(6)]]
        // });

        // Verificar si ya está autenticado (código ya implementado)
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/profile']);
        }
    }

    /**
     * TODO: IMPLEMENTAR - Método para manejar envío del formulario
     * Instrucciones:
     * 1. Verificar si el formulario es válido
     * 2. Si es válido: llamar a authService.login() con email y password
     * 3. Si login exitoso: redirigir a /profile
     * 4. Si login falla: mostrar mensaje de error
     * 5. Si formulario no es válido: marcar campos como tocados para mostrar errores
     */
    onSubmit(): void {
        // TODO: Implementar lógica de envío
        // Verificar validez del formulario
        // Obtener valores de email y password
        // Llamar a authService.login()
        // Manejar respuesta exitosa y errores
        console.log('TODO: Implementar método onSubmit');
    }

    // Métodos auxiliares ya implementados para facilitar el desarrollo
    private markFormGroupTouched(): void {
        Object.keys(this.loginForm.controls).forEach(key => {
            const control = this.loginForm.get(key);
            control?.markAsTouched();
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.loginForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }

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
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  hasError = signal(false);
  isPosting = signal(false);

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  OnSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { fullName = '', email = '', password = '' } = this.registerForm.value;

    console.log({ email, password });
    console.log('fb:', this.registerForm.value);

    this.authService.register(fullName!,email!, password!).subscribe((isAuthenticated) => {
      console.log('resp login:', isAuthenticated);
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
    });
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  OnSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    console.log({ email, password });
    console.log('fb:', this.loginForm.value);

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      console.log('resp login:', isAuthenticated);
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
    });
  }
}

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        title: 'Login',
        data: { title: 'Iniciar Sesión' }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        title: 'Register',
        data: { title: 'Crear Cuenta' }
      },
      {
        path: '**',
        redirectTo: 'login'
      },
    ],
  },
];


export default authRoutes;

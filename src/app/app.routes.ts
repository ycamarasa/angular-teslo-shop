import { Routes } from '@angular/router';
import authRoutes from '@auth/auth.routes';
import { IsAdminGuard } from '@auth/guard/is-admin.guard';
import { NotAuthenticatedGuard } from '@auth/guard/not-authenticate.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [
      // () => {
      //   console.log('hola mundo');
      //   return false;
      // },
      NotAuthenticatedGuard,
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    // canMatch: [IsAdminGuard],
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];

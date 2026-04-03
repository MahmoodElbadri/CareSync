import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
    
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-routing.module').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'patient',
    loadChildren:()=>import('./features/patient/patient-routing.module').then((m)=>m.PATIENT_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { role: 'Patient' }
  },
  {
    path: 'doctor',
    loadChildren: ()=>import('./features/doctor/doctor-routing.module')
    .then((m)=>m.DOCTOR_ROUTES),
    canActivate: [authGuard, roleGuard],
    data: { role: 'Doctor' }
  },
  {
    path: 'errors',
    loadChildren: ()=>import('./features/errors/errors-routing.module')
    .then((m)=>m.ErrorsRoutes),
  },
  {
    path: '**', // Wildcard route for any other path
    redirectTo: 'auth',
  },
];

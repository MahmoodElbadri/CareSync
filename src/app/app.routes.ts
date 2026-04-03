import { Routes } from '@angular/router';

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
    loadChildren:()=>import('./features/patient/patient-routing.module').then((m)=>m.PATIENT_ROUTES)
  },
  {
    path: 'doctor',
    loadChildren: ()=>import('./features/doctor/doctor-routing.module')
    .then((m)=>m.DOCTOR_ROUTES),
  },
  {
    path: '**', // Wildcard route for any other path
    redirectTo: 'auth',
  },
];

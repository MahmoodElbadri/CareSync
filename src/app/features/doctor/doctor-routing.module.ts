import { Route } from "@angular/router";

export const DOCTOR_ROUTES: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./doctor-dashboard/doctor-dashboard.component')
                                .then((m) => m.DoctorDashboardComponent),
        title: 'Doctor Dashboard'
    }
]
import { Route } from "@angular/router";

export const PATIENT_ROUTES:Route[] = [
    {
        path: '',
        redirectTo: 'doctor-list',
        pathMatch: 'full'
    },
    {
        path: 'doctor-list',
        loadComponent: () =>import('./doctor-list/doctor-list.component').then((m)=> m.DoctorListComponent),
        title: 'Doctor List'
    }
]
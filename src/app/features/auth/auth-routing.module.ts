import { Route } from "@angular/router";

export const AUTH_ROUTES: Route[] = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () =>import('./login/login.component')
        .then((m)=> m.LoginComponent),
        title: 'Login'
    },
    {
        path: 'register',
        loadComponent: () =>import('./register/register.component')
        .then((m)=> m.RegisterComponent),
        title: 'Register'
    }
]
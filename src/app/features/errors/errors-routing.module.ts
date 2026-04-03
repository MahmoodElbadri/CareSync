import { Routes } from "@angular/router";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";

export const ErrorsRoutes: Routes = [
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
        title: 'Unauthorized Access'
    }
];
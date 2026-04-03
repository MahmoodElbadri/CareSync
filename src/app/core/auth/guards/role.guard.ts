import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const currentRole = authService.role();
  const toastr = inject(ToastrService);
  const router = inject(Router);

  const expectedRole = route.data['role'];

  if(currentRole === expectedRole){
    return true;
  }
  else{
    toastr.error('You are not authorized to access this page');
    router.navigate(['/errors/unauthorized']);
    return false;
  }
};

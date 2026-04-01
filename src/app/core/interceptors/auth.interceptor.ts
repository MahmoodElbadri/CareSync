import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  
  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //in case of token expired    
  return next(clonedReq).pipe(
    catchError((err)=>{
      if(err.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        router.navigate(['/login']);
      }
      return throwError(()=> new Error("You don't have permission to access this resource"));
    })
  )
};

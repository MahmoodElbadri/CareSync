import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {

  //injections
  private router = inject(Router);
  private authService = inject(AuthService);

  //methods
  goToHome(){
    if(this.authService.role() === 'Patient'){
      this.router.navigate(['/patient']);
    }
    else if (this.authService.role() === 'Doctor'){
      this.router.navigate(['/doctor']);
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}

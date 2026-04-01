import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-unauthorized-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './unauthorized-navbar.component.html',
  styleUrl: './unauthorized-navbar.component.scss'
})
export class UnauthorizedNavbarComponent implements OnInit {
  mobileMenuOpen = false;
  
  protected authService = inject(AuthService);
  private router = inject(Router);
  protected isLoggedIn = this.authService.isLoggedIn;

  constructor() {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }



  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  logout() {
    this.closeMobileMenu();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

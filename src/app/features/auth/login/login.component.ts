import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  //injections
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  //variables
  loginForm!: FormGroup;

  //methods
  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100), Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    })
  }

  onSubmit(){
    let loginDto = this.loginForm.value;
    this.authService.login(loginDto).subscribe({
      next: (response) => {
        this.toastr.success('Logged in successfully');
        this.router.navigate(['/patient']);
      },
      error: (error) => {
        this.toastr.error(error);
      }
    })
  }

}

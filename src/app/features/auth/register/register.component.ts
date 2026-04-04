import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  //injections
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  //variables
  registerForm!: FormGroup;

  //methods
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      if(this.authService.role() === 'Patient'){
        this.router.navigate(['/patient']);
      }
      else if(this.authService.role() === 'Doctor'){
        this.router.navigate(['/doctor']);
      }
    }
    this.initializeRegisterForm();
  }

  initializeRegisterForm(){
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      dateOfBirth: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]]
    })
  }

  onSubmit(){
    let registerDto = this.registerForm.value;
    this.authService.register(registerDto).subscribe({
      next: (response) => {
        this.toastr.success('Registered successfully');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.toastr.error(error.message);
      }
    })
  }
}
/*
/*
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string BloodGroup { get; set; } 
    */

import { Component, inject, OnInit, signal } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { DoctorAppointmentDto } from '../models/doctor-appointment-dto';
import { JsonPipe, TitleCasePipe, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [JsonPipe, TitleCasePipe, DatePipe],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit{

  //variables
  protected doctorAppointments = signal<DoctorAppointmentDto[]>([]);
  //injections
  protected doctorService = inject(DoctorService);
  private toastr = inject(ToastrService);

  //methods
  ngOnInit(): void {
    console.log('Doctor Dashboard is called');
    this.getDoctorAppointments();
  }

  getDoctorAppointments(){
    this.doctorService.getDoctorAppointment().subscribe({
      next: (response) => {
        this.doctorAppointments.set(response);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  changeAppointmentStatus(id: number, status: string){
    this.doctorService.changeAppointmentStatus(id, status).subscribe({
      next: (response) => {
        this.toastr.success('Appointment status changed successfully');
        this.getDoctorAppointments();
      },
      error: (error) => {
        this.toastr.error('Failed to change appointment status');
      }
    })
  }


}

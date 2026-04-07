import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { DoctorAppointmentDto } from '../models/doctor-appointment-dto';
import { JsonPipe, TitleCasePipe, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [JsonPipe, TitleCasePipe, DatePipe, TranslateModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit{

  //variables
  protected doctorAppointments = signal<DoctorAppointmentDto[]>([]);
  //injections
  protected doctorService = inject(DoctorService);
  private toastr = inject(ToastrService);
  private notificationService = inject(NotificationService);

  //methods
  ngOnInit(): void {
    console.log('Doctor Dashboard is called');
    this.notificationService.startConnection();
    this.getDoctorAppointments();
  }

  /**
   *
   */
  constructor() {
    effect(()=>{
      const notification = this.notificationService.incomingNotification();
      if(notification){
        this.toastr.success(notification);
        this.getDoctorAppointments();
      }
    });
    
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

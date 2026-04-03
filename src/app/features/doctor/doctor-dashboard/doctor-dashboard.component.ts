import { Component, inject, OnInit, signal } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { DoctorAppointmentDto } from '../models/doctor-appointment-dto';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit{

  //variables

  //injections
  protected doctorService = inject(DoctorService);

  //methods
  ngOnInit(): void {
    console.log('Doctor Dashboard is called');
    this.doctorService.getDoctorAppointment();
  }


}

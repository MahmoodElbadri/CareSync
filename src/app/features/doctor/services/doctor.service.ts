import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { DoctorAppointmentDto } from '../models/doctor-appointment-dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  //injections
  private http = inject(HttpClient);

  //variables
  protected apiUrl = environment.baseUrl;
  public doctorAppointments = signal<DoctorAppointmentDto[]>([]);

  //methods
  //[HttpGet("get-doctor-appointments")]
  //DoctorsController
  getDoctorAppointment(){
    this.http.get<DoctorAppointmentDto[]>(`${this.apiUrl}Doctors/get-doctor-appointments`)
    .subscribe({
      next: (response)=>{
        this.doctorAppointments.set(response);
      },
      error: (error)=>{
        console.error(error);
      }
    })
  }
  
}

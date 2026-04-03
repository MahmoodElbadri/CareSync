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
  // public doctorAppointments = signal<DoctorAppointmentDto[]>([]);

  //methods
  //[HttpGet("get-doctor-appointments")]
  //DoctorsController
  getDoctorAppointment(){
    return this.http.get<DoctorAppointmentDto[]>(`${this.apiUrl}Doctors/get-doctor-appointments`);
  }

  // [HttpPut("change-appointment-status/{id}")]
  //DoctorsController
  //public async Task<IActionResult> ChangeAppointmentStatus(int id, [FromBody] string status)
  changeAppointmentStatus(id: number, status: string){
    return this.http.put(`${this.apiUrl}Doctors/change-appointment-status/${id}`,
      JSON.stringify({status}),
      {headers: {'Content-Type': 'application/json'}}
    );
  }
  
}

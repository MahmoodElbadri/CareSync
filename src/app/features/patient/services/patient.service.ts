import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DoctorReadDto } from '../models/doctor-read-dto';
import { ReservationCreateDto } from '../models/reservation-create-dto';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  //injections
  private http = inject(HttpClient);
  public doctors = signal<DoctorReadDto[]>([]);

  //variables
  protected apiUrl = environment.baseUrl;

  //methods
  getAllDoctors() {
    this.http
      .get<DoctorReadDto[]>(`${this.apiUrl}Doctors/get-all-doctors`)
      .subscribe({
        next: (response) => {
          this.doctors.set(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  //AppointmentsController/[HttpPost("create-appointment")]
  bookAppointmentWithDoctor(model: ReservationCreateDto) {
    return this.http.post(
      `${this.apiUrl}Appointments/create-appointment`,
      model,
      // {responseType: 'text'}
    );
  }

  // //[HttpGet("get-doctor-appointments")]
  // getDoctorAppointments(doctorId: number){
  //   return this.http.get(`${this.apiUrl}Appointments/get-doctor-appointments/${doctorId}`);
  // }
}

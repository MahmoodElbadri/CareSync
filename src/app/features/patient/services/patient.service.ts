import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DoctorReadDto } from '../models/doctor-read-dto';
import { ReservationCreateDto } from '../models/reservation-create-dto';
import { DoctorParameters } from '../models/doctor-parameters';

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
  getAllDoctors(params?: DoctorParameters) {
    let httpParams = new HttpParams();
    if(params?.search){
      params.search = params.search.trim();
      httpParams = httpParams.append('search', params.search);
    }
    if(params?.specialityName){
      params.specialityName = params.specialityName.trim();
      httpParams = httpParams.append('specialityName', params.specialityName);
    }
    this.http
      .get<DoctorReadDto[]>(`${this.apiUrl}Doctors/get-all-doctors`, {params: httpParams})
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

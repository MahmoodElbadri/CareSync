import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { DoctorReadDto } from '../models/doctor-read-dto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //injections
  private http = inject(HttpClient);
  public doctors = signal<DoctorReadDto[]>([]);

  //variables
  protected apiUrl = environment.baseUrl;

  //methods
  getAllDoctors(){
    this.http.get<DoctorReadDto[]>(`${this.apiUrl}Doctors/get-all-doctors`).subscribe({
      next: (response) => {
        this.doctors.set(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}

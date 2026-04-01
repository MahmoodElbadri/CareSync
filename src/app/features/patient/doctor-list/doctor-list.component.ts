import { Component, OnInit, inject } from '@angular/core';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit{


  //injections
  private patientService = inject(PatientService);

  //variables
  public doctors = this.patientService.doctors; 

  //methods
  ngOnInit(): void {
    this.patientService.getAllDoctors();
  }
}

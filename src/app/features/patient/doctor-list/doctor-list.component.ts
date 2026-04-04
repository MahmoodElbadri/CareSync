import { Component, OnInit, inject } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { CurrencyPipe } from '@angular/common';
import { DoctorReadDto } from '../models/doctor-read-dto';
import { ReservationCreateDto } from '../models/reservation-create-dto';
import { Toast, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorParameters } from '../models/doctor-parameters';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss',
})
export class DoctorListComponent implements OnInit {
  //injections
  private patientService = inject(PatientService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);

  //variables
  public doctors = this.patientService.doctors;
  protected isModalOpen = false;
  protected selectedItem: DoctorReadDto | null = null;
  protected reservationForm!: FormGroup;
  protected searchForm!: FormGroup;
  /*
   new Speciality { Id = 1, Name = "Cardiology" },      // أمراض القلب
 new Speciality { Id = 2, Name = "Dermatology" },     // الجلدية
 new Speciality { Id = 3, Name = "Pediatrics" },      // طب الأطفال
 new Speciality { Id = 4, Name = "Orthopedics" },     // جراحة العظام
 new Speciality { Id = 5, Name = "Neurology" },       // المخ والأعصاب
 new Speciality { Id = 6, Name = "Ophthalmology" },   // طب العيون
 new Speciality { Id = 7, Name = "Dentistry" },       // طب الأسنان
 new Speciality { Id = 8, Name = "Psychiatry" },      // الطب النفسي
 new Speciality { Id = 9, Name = "Internal Medicine"} // الباطنة*/
  protected specialities: string[] =
   ['Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology', 'Ophthalmology', 'Dentistry', 'Psychiatry', 'Internal Medicine'];

  //methods
  ngOnInit(): void {
    this.patientService.getAllDoctors();
    // this.initializeSearchForm();
  }

  initializeSearchForm(){
    this.searchForm = this.fb.group({
      search: [''],
      specialityName: ['']
    })
  }

  initializeBookingForm(){
    this.reservationForm = this.fb.group({
      doctorId: [this.selectedItem?.id],
      appointmentDate: ['', Validators.required],
      notes: ['']
    })
  }

  openModal(item: DoctorReadDto) {
    this.isModalOpen = true;
    this.selectedItem = item;
    this.initializeBookingForm();
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedItem = null;
  }

  onSubmit(){
    let model: ReservationCreateDto = {
      doctorId: this.selectedItem?.id!,
      appointmentDate: this.reservationForm.value.appointmentDate,
      notes: this.reservationForm.value.notes
    }
    this.patientService.bookAppointmentWithDoctor(model).subscribe({
      next: () => {
        this.toastr.success('Appointment booked successfully');
        this.closeModal();
      },
      error: (error) => {
        this.toastr.error(error);
      }
    })
  }

  filterBySpeciality(speciality: string){
    let docParams: DoctorParameters = {
      search: '',
      specialityName: speciality
    }
    this.patientService.getAllDoctors(docParams);
  }

  searchDoctors(){
    let docParams: DoctorParameters = {
      search: this.searchForm.value.search,
      specialityName: this.searchForm.value.specialityName
    }
    this.patientService.getAllDoctors(docParams);
  }

  resetSearch(){
    this.searchForm.reset();
    this.patientService.getAllDoctors();
  }
}

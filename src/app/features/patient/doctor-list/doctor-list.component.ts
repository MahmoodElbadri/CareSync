import { Component, OnInit, inject } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { CurrencyPipe } from '@angular/common';
import { DoctorReadDto } from '../models/doctor-read-dto';
import { ReservationCreateDto } from '../models/reservation-create-dto';
import { Toast, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  //methods
  ngOnInit(): void {
    this.patientService.getAllDoctors();
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

  getDoctorAppointments(doctorId: number){
    
  }
}

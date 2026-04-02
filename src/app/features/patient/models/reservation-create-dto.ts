export interface ReservationCreateDto {
    doctorId: number;
    appointmentDate: Date;
    notes?: string;
}

/*
    public int DoctorId { get; set; }
    public DateTime AppointmentDate { get; set; }
    public string? Notes { get; set; }
    */

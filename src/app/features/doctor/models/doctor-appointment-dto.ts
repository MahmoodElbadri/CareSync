export interface DoctorAppointmentDto {
    appointmentId: number;
    patientName: string;
    appointmentDate: Date;
    notes?: string;
    status: string;
}

/*
public class DoctorAppointmentDto
{
    public int AppointmentId { get; set; }
    public string PatientName { get; set; }
    public DateTime AppointmentDate { get; set; }
    public string? Notes { get; set; }
    public string Status { get; set; }
}*/
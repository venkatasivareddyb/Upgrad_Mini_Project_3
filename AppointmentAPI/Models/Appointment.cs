namespace AppointmentAPI.Models
{
    public enum AppointmentStatus { Booked, Cancelled, Completed }

    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public DateTime Date { get; set; }
        public string Shift { get; set; } = string.Empty;
        public AppointmentStatus Status { get; set; } = AppointmentStatus.Booked;
    }
}

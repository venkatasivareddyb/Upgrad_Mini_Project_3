using AppointmentAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace AppointmentAPI.DTOs
{
    public class BookAppointmentRequest
    {
        [Required] public int PatientId { get; set; }
        [Required] public int DoctorId { get; set; }
        [Required] public DateTime Date { get; set; }
        [Required] public string Shift { get; set; } = string.Empty;
    }
}

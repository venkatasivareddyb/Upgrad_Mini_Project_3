using AppointmentAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace AppointmentAPI.DTOs
{
    public class UpdateAppointmentStatusRequest
    {
        [Required]
        public int AppointmentId { get; set; }

        [Required]
        public int DoctorId { get; set; }

        [Required]
        public AppointmentStatus Status { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace DoctorAPI.Models
{
    public class Doctor
    {
        [Key]
        public int Id { get; set; }

        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string Specialization { get; set; } = string.Empty;

        public string? Timings { get; set; } // e.g. "10am-2pm, 4pm-9pm"
        public bool IsApproved { get; set; } = false;
    }
}

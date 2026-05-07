using System.ComponentModel.DataAnnotations;

namespace DoctorAPI.DTOs
{
    public class DoctorDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Doctor name is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Specialization is required")]
        [StringLength(100, ErrorMessage = "Specialization cannot exceed 100 characters")]
        public string Specialization { get; set; } = string.Empty;

        [StringLength(200, ErrorMessage = "Timings cannot exceed 200 characters")]
        public string? Timings { get; set; }

        public bool IsApproved { get; set; }
    }
}

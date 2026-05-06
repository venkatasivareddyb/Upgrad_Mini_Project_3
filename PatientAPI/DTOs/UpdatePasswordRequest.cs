using System.ComponentModel.DataAnnotations;

namespace PatientAPI.DTOs
{
    public class UpdatePasswordRequest
    {
        [Required]
        public int PatientId { get; set; }

        [Required(ErrorMessage = "New password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
        public string NewPassword { get; set; } = string.Empty;
    }
}

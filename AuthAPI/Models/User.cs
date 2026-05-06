using System.ComponentModel.DataAnnotations;

namespace AuthAPI.Models
{
    public class User
    {
        [Key] // Primary Key
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "PasswordHash is required")]
        public string PasswordHash { get; set; } = string.Empty;

        [Required(ErrorMessage = "Role is required")]
        [RegularExpression("^(Admin|Doctor|Patient)$", ErrorMessage = "Role must be Admin, Doctor, or Patient")]
        public string Role { get; set; } = string.Empty;

        // Optional for doctors only
        public string? Specialization { get; set; }

        // Extra fields if needed later (e.g., approval status)
        public bool IsApproved { get; set; } = true;
    }
}

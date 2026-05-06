namespace PatientAPI.Models
{
    public class Patient
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Patient"; // default role
        public ICollection<Report> Reports { get; set; } = new List<Report>();
        public ICollection<Billing> Billings { get; set; } = new List<Billing>();
    }
}

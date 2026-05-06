namespace DoctorAPI.DTOs
{
    public class UpdateTimingsRequest
    {
        public int DoctorId { get; set; }
        public string MorningShift { get; set; } = string.Empty;
        public string EveningShift { get; set; } = string.Empty;
    }
}

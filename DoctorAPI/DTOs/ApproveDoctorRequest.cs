namespace DoctorAPI.DTOs
{
    public class ApproveDoctorRequest
    {
        public int DoctorId { get; set; }
        public bool Approve { get; set; }
    }
}

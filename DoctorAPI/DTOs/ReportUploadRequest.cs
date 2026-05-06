namespace DoctorAPI.DTOs
{
    public class ReportUploadRequest
    {
        public int AppointmentId { get; set; }
        public int DoctorId { get; set; }
        // File will be handled in controller/service as IFormFile in future endpoints
    }
}

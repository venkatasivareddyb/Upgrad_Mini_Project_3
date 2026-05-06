using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace PatientAPI.DTOs
{
    public class ReportUploadRequest
    {
        [Required]
        public int PatientId { get; set; }

        [Required(ErrorMessage = "Report file is required")]
        [DataType(DataType.Upload)]
        public IFormFile File { get; set; } = null!;
    }
}

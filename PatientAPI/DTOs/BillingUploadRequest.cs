using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;    
namespace PatientAPI.DTOs
{
    public class BillingUploadRequest
    {
        [Required]
        public int PatientId { get; set; }

        [Required(ErrorMessage = "Billing file is required")]
        [DataType(DataType.Upload)]
        public IFormFile File { get; set; }= null!;
    }
}

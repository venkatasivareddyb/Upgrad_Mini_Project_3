using DoctorAPI.DTOs;
using DoctorAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DoctorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly DoctorService _service;

        public DoctorController(DoctorService service)
        {
            _service = service;
        }

        // Accessible by Admins only
        [Authorize(Roles = "Admin")]
        [HttpPut("approve")]
        public async Task<IActionResult> ApproveDoctor([FromBody] ApproveDoctorRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _service.ApproveDoctorAsync(request);
            return Ok("Doctor approval updated");
        }

        // Accessible by Doctors only
        [Authorize(Roles = "Doctor")]
        [HttpPut("timings")]
        public async Task<IActionResult> UpdateTimings([FromBody] UpdateTimingsRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _service.UpdateTimingsAsync(request);
            return Ok("Doctor timings updated");
        }

        // Accessible by Admins and Doctors
        [Authorize(Roles = "Admin,Doctor")]
        [HttpGet]
        public async Task<IActionResult> GetAllDoctors()
        {
            var doctors = await _service.GetAllDoctorsAsync();
            return Ok(doctors);
        }

        // Accessible by Doctors only
        [Authorize(Roles = "Doctor")]
        [HttpPost("upload-report")]
        public async Task<IActionResult> UploadReport([FromBody] ReportUploadRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // For now, just simulate upload
            return Ok($"Report uploaded for Appointment {request.AppointmentId}");
        }
    }
}

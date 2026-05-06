using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatientAPI.DTOs;
using PatientAPI.Services;

namespace PatientAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly PatientService _service;

        public PatientController(PatientService service)
        {
            _service = service;
        }

        // Registration (open to all)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterPatientRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var patientId = await _service.RegisterPatientAsync(request);
            return Ok(new { PatientId = patientId });
        }

        // Accessible by Patients only
        [Authorize(Roles = "Patient")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientProfile(string id)
        {
            var profile = await _service.GetPatientProfileAsync(id);
            if (profile == null) return NotFound();
            return Ok(profile);
        }

        [Authorize(Roles = "Patient")]
        [HttpPut("update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordRequest request)
        {
            await _service.UpdatePasswordAsync(request);
            return Ok("Password updated successfully");
        }

        // Accessible by Admins or Doctors (upload reports/billings)
        [Authorize(Roles = "Admin,Doctor")]
        [HttpPost("upload-report")]
        public async Task<IActionResult> UploadReport([FromForm] ReportUploadRequest request)
        {
            var url = await _service.UploadReportAsync(request.PatientId, request.File);
            return Ok(new { ReportUrl = url });
        }

        [Authorize(Roles = "Admin,Doctor")]
        [HttpPost("upload-billing")]
        public async Task<IActionResult> UploadBilling([FromForm] BillingUploadRequest request)
        {
            var url = await _service.UploadBillingAsync(request.PatientId, request.File);
            return Ok(new { BillingUrl = url });
        }
    }
}

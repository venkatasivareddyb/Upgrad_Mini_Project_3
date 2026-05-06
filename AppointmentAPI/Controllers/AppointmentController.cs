using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AppointmentAPI.Services;
using AppointmentAPI.DTOs;
using AppointmentAPI.Models;

namespace AppointmentAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentService _service;

        public AppointmentController(AppointmentService service)
        {
            _service = service;
        }

        // Book appointment (Patient only)
        [Authorize(Roles = "Patient")]
        [HttpPost("book")]
        public async Task<IActionResult> Book([FromBody] BookAppointmentRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var appointmentId = await _service.BookAppointmentAsync(request);
            return Ok(new { AppointmentId = appointmentId });
        }

        // Get appointments by patient
        [Authorize(Roles = "Patient")]
        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetByPatient(int patientId)
        {
            var appointments = await _service.GetAppointmentsByPatientAsync(patientId);
            return Ok(appointments);
        }

        // Get appointments by doctor
        [Authorize(Roles = "Doctor")]
        [HttpGet("doctor/{doctorId}")]
        public async Task<IActionResult> GetByDoctor(int doctorId)
        {
            var appointments = await _service.GetAppointmentsByDoctorAsync(doctorId);
            return Ok(appointments);
        }

        // Update status (Admin/Doctor)
        [Authorize(Roles = "Admin,Doctor")]
        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateAppointmentStatusRequest request)
        {
            await _service.UpdateStatusAsync(request);
            return Ok("Appointment status updated successfully");
        }

        // Get today's appointments (Doctor)
        [Authorize(Roles = "Doctor")]
        [HttpGet("doctor/{doctorId}/today")]
        public async Task<IActionResult> GetTodayAppointments(int doctorId)
        {
            var appointments = await _service.GetTodayAppointmentsAsync(doctorId);
            return Ok(appointments);
        }
    }
}

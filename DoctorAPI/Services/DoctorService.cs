using DoctorAPI.DTOs;
using DoctorAPI.Helpers;
using DoctorAPI.Models;
using DoctorAPI.Repositories.Interfaces;

namespace DoctorAPI.Services
{
    public class DoctorService
    {
        private readonly IDoctorRepository _repo;
        private readonly JwtHelper _jwt;
        private readonly FileHelper _fileHelper;
        private readonly EmailHelper _emailHelper;

        public DoctorService(
            IDoctorRepository repo,
            JwtHelper jwt,
            FileHelper fileHelper,
            EmailHelper emailHelper)
        {
            _repo = repo;
            _jwt = jwt;
            _fileHelper = fileHelper;
            _emailHelper = emailHelper;
        }

        public async Task<IEnumerable<Doctor>> GetAllDoctorsAsync() => await _repo.GetAllAsync();

        public async Task ApproveDoctorAsync(ApproveDoctorRequest request)
        {
            var doctor = await _repo.GetByIdAsync(request.DoctorId);
            if (doctor == null) return;

            doctor.IsApproved = request.Approve;
            await _repo.UpdateDoctorAsync(doctor);

            // 🔹 Send email notification
            var subject = doctor.IsApproved ? "Doctor Approved" : "Doctor Rejected";
            var body = doctor.IsApproved
                ? $"Dear {doctor.Name}, your account has been approved."
                : $"Dear {doctor.Name}, your account has been rejected.";
            await _emailHelper.SendEmailAsync("doctor@example.com", subject, body);
        }

        public async Task UpdateTimingsAsync(UpdateTimingsRequest request)
        {
            var doctor = await _repo.GetByIdAsync(request.DoctorId);
            if (doctor == null) return;

            // 🔹 Validate timings using ValidationHelper
            if (!ValidationHelper.IsValidShiftFormat(request.MorningShift) ||
                !ValidationHelper.IsValidShiftFormat(request.EveningShift))
            {
                throw new ArgumentException("Invalid shift format. Use '10am - 2pm'.");
            }

            doctor.Timings = $"{request.MorningShift}, {request.EveningShift}";
            await _repo.UpdateDoctorAsync(doctor);
        }

        public async Task<string> UploadReportAsync(int doctorId, IFormFile file)
        {
            var doctor = await _repo.GetByIdAsync(doctorId);
            if (doctor == null) throw new ArgumentException("Doctor not found");

            // 🔹 Validate file type
            if (!ValidationHelper.IsValidReportFile(file.FileName))
                throw new ArgumentException("Invalid file type. Allowed: PDF, DOCX, JPG, PNG");

            // 🔹 Save file using FileHelper
            var reportUrl = await _fileHelper.SaveReportAsync(file, doctor.Name);

            // 🔹 Send email notification
            await _emailHelper.SendEmailAsync("patient@example.com",
                "Report Uploaded",
                $"Doctor {doctor.Name} uploaded a report. Access it here: {reportUrl}");

            return reportUrl;
        }

        public string GenerateDoctorToken(Doctor doctor)
        {
            return _jwt.GenerateToken(doctor);
        }
    }
}

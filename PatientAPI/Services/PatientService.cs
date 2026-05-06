using PatientAPI.DTOs;
using PatientAPI.Helpers;
using PatientAPI.Models;
using PatientAPI.Repositories.Interfaces;

namespace PatientAPI.Services
{
    public class PatientService
    {
        private readonly IPatientRepository _repo;
        private readonly FileHelper _fileHelper;
        private readonly EmailHelper _emailHelper;

        public PatientService(IPatientRepository repo, FileHelper fileHelper, EmailHelper emailHelper)
        {
            _repo = repo;
            _fileHelper = fileHelper;
            _emailHelper = emailHelper;
        }

        public async Task<int> RegisterPatientAsync(RegisterPatientRequest request)
        {
            var patient = new Patient
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            return await _repo.RegisterPatientAsync(patient);
        }

        public async Task<Patient?> GetPatientProfileAsync(string id)
        {
            if (!int.TryParse(id, out var patientId)) return null;
            return await _repo.GetByIdAsync(patientId);
        }

        public async Task UpdatePasswordAsync(UpdatePasswordRequest request)
        {
            var patient = await _repo.GetByIdAsync(request.PatientId);
            if (patient == null) throw new ArgumentException("Patient not found");

            patient.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await _repo.UpdatePatientAsync(patient);
        }

        public async Task<string> UploadReportAsync(int patientId, IFormFile file)
        {
            var patient = await _repo.GetByIdAsync(patientId);
            if (patient == null) throw new ArgumentException("Patient not found");

            var url = await _fileHelper.SaveReportAsync(file, patient.Name);
            var report = new Report { Url = url, PatientId = patientId };
            await _repo.AddReportAsync(report);

            await _emailHelper.SendEmailAsync(patient.Email, "Report Uploaded", $"Your report is available at {url}");
            return url;
        }

        public async Task<string> UploadBillingAsync(int patientId, IFormFile file)
        {
            var patient = await _repo.GetByIdAsync(patientId);
            if (patient == null) throw new ArgumentException("Patient not found");

            var url = await _fileHelper.SaveReportAsync(file, patient.Name);
            var billing = new Billing { Url = url, PatientId = patientId };
            await _repo.AddBillingAsync(billing);

            await _emailHelper.SendEmailAsync(patient.Email, "Billing Uploaded", $"Your billing statement is available at {url}");
            return url;
        }
    }
}

using AppointmentAPI.DTOs;
using AppointmentAPI.Models;
using AppointmentAPI.Repositories.Interfaces;

namespace AppointmentAPI.Services
{
    public class AppointmentService
    {
        private readonly IAppointmentRepository _repo;

        public AppointmentService(IAppointmentRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> BookAppointmentAsync(BookAppointmentRequest request)
        {
            var appointment = new Appointment
            {
                PatientId = request.PatientId,
                DoctorId = request.DoctorId,
                Date = request.Date,
                Shift = request.Shift,
                Status = AppointmentStatus.Booked
            };

            return await _repo.BookAsync(appointment);
        }

        public Task<List<Appointment>> GetAppointmentsByPatientAsync(int patientId) =>
            _repo.GetByPatientAsync(patientId);

        public Task<List<Appointment>> GetAppointmentsByDoctorAsync(int doctorId) =>
            _repo.GetByDoctorAsync(doctorId);

        public async Task UpdateStatusAsync(UpdateAppointmentStatusRequest request)
        {
            var appointments = await _repo.GetByDoctorAsync(request.DoctorId);
            var appointment = appointments.FirstOrDefault(a => a.Id == request.AppointmentId);

            if (appointment == null)
                throw new ArgumentException("Appointment not found");

            appointment.Status = request.Status;
            await _repo.UpdateAsync(appointment);
        }

        public Task<List<Appointment>> GetTodayAppointmentsAsync(int doctorId) =>
            _repo.GetTodayAppointmentsAsync(doctorId);
    }
}


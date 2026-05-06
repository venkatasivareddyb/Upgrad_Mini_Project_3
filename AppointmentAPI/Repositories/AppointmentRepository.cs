using AppointmentAPI.Data;
using AppointmentAPI.Models;
using AppointmentAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AppointmentAPI.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly AppointmentDbContext _context;

        public AppointmentRepository(AppointmentDbContext context)
        {
            _context = context;
        }

        public async Task<int> BookAsync(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            return appointment.Id;
        }

        public async Task<List<Appointment>> GetByPatientAsync(int patientId)
        {
            return await _context.Appointments
                .Where(a => a.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetByDoctorAsync(int doctorId)
        {
            return await _context.Appointments
                .Where(a => a.DoctorId == doctorId)
                .ToListAsync();
        }

        public async Task<List<Appointment>> GetTodayAppointmentsAsync(int doctorId)
        {
            var today = DateTime.UtcNow.Date;
            return await _context.Appointments
                .Where(a => a.DoctorId == doctorId && a.Date.Date == today)
                .ToListAsync();
        }

        public async Task UpdateAsync(Appointment appointment)
        {
            _context.Appointments.Update(appointment);
            await _context.SaveChangesAsync();
        }
    }
}

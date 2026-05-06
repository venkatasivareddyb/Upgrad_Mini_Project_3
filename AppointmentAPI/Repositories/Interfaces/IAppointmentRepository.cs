using AppointmentAPI.Models;

namespace AppointmentAPI.Repositories.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<int> BookAsync(Appointment appointment);
        Task<List<Appointment>> GetByPatientAsync(int patientId);
        Task<List<Appointment>> GetByDoctorAsync(int doctorId);
        Task<List<Appointment>> GetTodayAppointmentsAsync(int doctorId);
        Task UpdateAsync(Appointment appointment);
    }
}

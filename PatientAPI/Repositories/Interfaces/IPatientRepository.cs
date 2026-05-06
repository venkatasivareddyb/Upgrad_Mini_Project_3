using PatientAPI.Models;

namespace PatientAPI.Repositories.Interfaces
{
    public interface IPatientRepository
    {
        Task<int> RegisterPatientAsync(Patient patient);
        Task<Patient?> GetByIdAsync(int id);
        Task UpdatePatientAsync(Patient patient);
        Task AddReportAsync(Report report);
        Task AddBillingAsync(Billing billing);
    }
}

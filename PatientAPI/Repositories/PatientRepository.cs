using Microsoft.EntityFrameworkCore;
using PatientAPI.Data;
using PatientAPI.Models;
using PatientAPI.Repositories.Interfaces;

namespace PatientAPI.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly PatientDbContext _context;

        public PatientRepository(PatientDbContext context)
        {
            _context = context;
        }

        public async Task<int> RegisterPatientAsync(Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return patient.Id;
        }

        public async Task<Patient?> GetByIdAsync(int id)
        {
            return await _context.Patients
                .Include(p => p.Reports)
                .Include(p => p.Billings)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task UpdatePatientAsync(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }

        public async Task AddReportAsync(Report report)
        {
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();
        }

        public async Task AddBillingAsync(Billing billing)
        {
            _context.Billings.Add(billing);
            await _context.SaveChangesAsync();
        }
    }
}

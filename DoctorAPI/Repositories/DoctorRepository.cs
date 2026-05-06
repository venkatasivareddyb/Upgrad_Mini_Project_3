using DoctorAPI.Data;
using DoctorAPI.Models;
using DoctorAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DoctorAPI.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly DoctorDbContext _context;

        public DoctorRepository(DoctorDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> GetAllAsync() => await _context.Doctors.ToListAsync();
        public async Task<Doctor?> GetByIdAsync(int id) => await _context.Doctors.FindAsync(id);

        public async Task AddDoctorAsync(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDoctorAsync(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
        }
    }
}

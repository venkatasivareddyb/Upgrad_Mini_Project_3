using Microsoft.EntityFrameworkCore;
using PatientAPI.Models;
namespace PatientAPI.Data
{
    public class PatientDbContext : DbContext
    {
        public PatientDbContext(DbContextOptions<PatientDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Billing> Billings { get; set; }
    }
}

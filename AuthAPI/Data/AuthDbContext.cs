
using AuthAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace AuthAPI.Data
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }

        // DbSet for Users table
        public DbSet<User> Users { get; set; }

        // Optional: configure entity properties
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Example: enforce unique email
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Seed an Admin account
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Name = "System Admin",
                Email = "admin@healthcare.com",
                PasswordHash = "hashedpasswordhere", // Replace with actual hashed password
                Role = "Admin",
                IsApproved = true
            });
        }
    }
}

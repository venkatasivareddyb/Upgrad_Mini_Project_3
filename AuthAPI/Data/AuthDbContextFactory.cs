using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AuthAPI.Data
{
    // Design-time factory so EF tools can create the DbContext without
    // building the full application (avoids hosting/service resolution errors).
    public class AuthDbContextFactory : IDesignTimeDbContextFactory<AuthDbContext>
    {
        public AuthDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AuthDbContext>();

            // Update this connection string if you want a different database for migrations
            var connectionString = "Server=(localdb)\\mssqllocaldb;Database=AuthDb;Trusted_Connection=True;";

            optionsBuilder.UseSqlServer(connectionString);
            return new AuthDbContext(optionsBuilder.Options);
        }
    }
}

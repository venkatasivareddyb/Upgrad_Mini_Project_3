using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.Text;

namespace GatewayAPI
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Load Ocelot configuration
            builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

            // JWT Authentication
            builder.Services.AddAuthentication("JwtBearer")
    .AddJwtBearer("JwtBearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });


            // 🔹 Role-based policies
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("DoctorPolicy", policy =>
                    policy.RequireRole("Doctor"));

                options.AddPolicy("PatientPolicy", policy =>
                    policy.RequireRole("Patient"));

                options.AddPolicy("AdminPolicy", policy =>
                    policy.RequireRole("Admin"));
            });

            // Register Ocelot
            builder.Services.AddOcelot();

            var app = builder.Build();

            // Friendly root endpoint
            app.MapGet("/", () =>
                "GatewayAPI is running. Use /auth, /doctor, /patient, /appointment routes.");

            app.UseAuthentication();
            app.UseAuthorization();

            await app.UseOcelot();

            app.Run();
        }
    }
}

using PatientAPI.Data;
using PatientAPI.Repositories;
using PatientAPI.Repositories.Interfaces;
using PatientAPI.Services;
using PatientAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
namespace PatientAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 🔹 Database Context
            builder.Services.AddDbContext<PatientDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("PatientDb")));

            // 🔹 Dependency Injection
            builder.Services.AddScoped<IPatientRepository, PatientRepository>();
            builder.Services.AddScoped<PatientService>();
            builder.Services.AddScoped<JwtHelper>();
            builder.Services.AddScoped<FileHelper>();
            builder.Services.AddScoped<EmailHelper>();
   

            builder.Services.AddAutoMapper(typeof(Program));

            // 🔹 JWT Authentication
            builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer(options =>
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

            // 🔹 Authorization Policies
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Admin"));
                options.AddPolicy("DoctorPolicy", policy => policy.RequireRole("Doctor"));
                options.AddPolicy("PatientPolicy", policy => policy.RequireRole("Patient"));
            });

            // 🔹 Controllers + Swagger
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}

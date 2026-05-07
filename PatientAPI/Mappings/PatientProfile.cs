using AutoMapper;
using PatientAPI.DTOs;
using PatientAPI.Models;

namespace PatientAPI.Mappings
{
    public class PatientProfile : Profile
    {
        public PatientProfile()
        {
            // Patient registration ↔ Patient entity
            CreateMap<RegisterPatientRequest, Patient>().ReverseMap();

            // Update password ↔ Patient entity
            CreateMap<UpdatePasswordRequest, Patient>().ReverseMap();

            // Report upload ↔ Report entity
            CreateMap<ReportUploadRequest, Report>().ReverseMap();

            // Billing upload ↔ Billing entity
            CreateMap<BillingUploadRequest, Billing>().ReverseMap();
        }
    }
}

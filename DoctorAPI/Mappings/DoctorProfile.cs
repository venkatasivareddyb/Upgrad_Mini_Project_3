using AutoMapper;
using DoctorAPI.DTOs;
using DoctorAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DoctorAPI.Mappings
{
    public class DoctorProfile : Profile
    {
        public DoctorProfile()
        {
            CreateMap<Doctor, DoctorDto>().ReverseMap();
          
            CreateMap<ApproveDoctorRequest, Doctor>().ReverseMap();

            // Update timings request ↔ Doctor entity
            CreateMap<UpdateTimingsRequest, Doctor>().ReverseMap();

            // Report upload request ↔ Doctor entity
            CreateMap<ReportUploadRequest, Doctor>().ReverseMap();
        }
    }
}

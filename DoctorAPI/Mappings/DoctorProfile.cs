using AutoMapper;
using DoctorAPI.DTOs;
using DoctorAPI.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DoctorApi.Mappings
{
    public class DoctorProfile : Profile
    {
        public DoctorProfile()
        {
            CreateMap<Doctor, DoctorDto>();
            CreateMap<DoctorDto, Doctor>();
        }
    }
}

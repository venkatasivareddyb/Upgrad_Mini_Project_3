
using AuthAPI.DTOs;
using AuthAPI.Models;
using AutoMapper;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace AuthAPI.Mappings
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            // Map User → LoginResponse
            CreateMap<User, LoginResponse>()
                .ForMember(dest => dest.Token, opt => opt.Ignore()) // Token generated separately
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
                .ForMember(dest => dest.IsApproved, opt => opt.MapFrom(src => src.IsApproved));

            // Map RegisterRequest → User
            CreateMap<RegisterRequest, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore()) // Password hashed in service
                .ForMember(dest => dest.IsApproved, opt => opt.MapFrom(src => src.Role == "Doctor" ? false : true));
        }
    }
}

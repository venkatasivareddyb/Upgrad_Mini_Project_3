using AppointmentAPI.DTOs;
using AppointmentAPI.Models;
using AutoMapper;

namespace AppointmentAPI.Mappinngs
{
    public class AppointmentProfile : Profile
    {
        public AppointmentProfile()
        {
            // Book appointment ↔ Appointment entity
            CreateMap<BookAppointmentRequest, Appointment>().ReverseMap();

            // Update appointment status ↔ Appointment entity
            CreateMap<UpdateAppointmentStatusRequest, Appointment>().ReverseMap();
        }
    }
}

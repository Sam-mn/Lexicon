using LMS.API.Models.Entities;

namespace LMS.API.Models.Dtos
{
    public record ActivitiesDto
    {
        public string Name { get; set; }
        public string ActivityTypeName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}

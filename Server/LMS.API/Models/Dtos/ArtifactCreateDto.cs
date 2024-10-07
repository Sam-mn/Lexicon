using LMS.API.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Models.Dtos
{
    public record ArtifactCreateDto
    {
       public IFormFile file { get; set; }
       public string description { get; set; }
       public string fileName { get; set; }
       public string ContentType { get; set; }
       public Guid? UserId { get; set; }
       public Guid? CourseId { get; set; }
       public Guid? ModuleId { get; set; }
       public Guid? ActivityId { get; set; }
        public string? Status {  get; set; }
    }
}

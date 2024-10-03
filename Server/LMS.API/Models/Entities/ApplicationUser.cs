using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LMS.API.Models.Entities;

public class ApplicationUser : IdentityUser
{
    [MaxLength(15, ErrorMessage = "Max length is 15.")]
    public string? Name { get; set; }

    [Required(ErrorMessage = "Email is a required field.")]
    [MaxLength(ErrorMessage = "Maximum length is 20.")]
    public string Email { get; set; }
    public string UserRole { get; set; }
    
    //Foreign key Guid
    [ForeignKey("Course")]
    public Guid? CourseId { get; set; }

    //Navigation property for Course
    public Course? Course { get; set; }

    //Navigation property for Artifacts
    public ICollection<Artifact>? Artifacts { get; set; }

    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpireTime { get; set; }
}

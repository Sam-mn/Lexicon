using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMS.API.Models.Dtos;

public record UserForRegistrationDto
{
    [Required(ErrorMessage = "´Name is required")]
    public string? Name { get; init; }

    [Required(ErrorMessage = "Username is required")]
    public string? UserName { get; init; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; init; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress]
    public string? Email { get; init; }

    [Required]
    public string? UserRole { get; init; }

    [Required]
    [ForeignKey("Course")]
    public Guid CourseId { get; init; }
}

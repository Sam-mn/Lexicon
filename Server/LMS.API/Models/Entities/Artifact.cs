using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace LMS.API.Models.Entities
{
    public class Artifact
    {
        //Primary key Guid
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "File name is a required field.")]

        public string FileName { get; set; }

        [Required(ErrorMessage = "File must have a filepath.")]
        public string Filepath { get; set; }

        public string? Description { get; set; }

        [Required(ErrorMessage = "There must be a created date.")]
        DateTime CreatedAt { get; set; }

        [Required(ErrorMessage = "There must be an uploaded date.")]
        DateTime UploadTime { get; set; }

        //Navigation properties
        public Guid UserId { get; set; }
        public virtual User UploadedBy { get; set; }

        public Guid CourseId { get; set; }
        public virtual Course RelatedTo { get; set; }

        public Guid ModuleId {  get; set; }
        public virtual Module AssociatedWith { get; set; }

        public Guid ActivityId {  get; set; }
        public virtual Activity PartOf { get; set; }
    }
}

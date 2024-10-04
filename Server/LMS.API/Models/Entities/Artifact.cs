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

        [Required(ErrorMessage = "FileContent must have a filepath.")]
        public byte[] FileContent { get; set; }
        public string ContentType { get; set; }

        [Required(ErrorMessage = "Description must have a filepath.")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "There must be an uploaded date.")]
        public DateTime UploadTime { get; set; }

        //Navigation properties
        public Guid? UserId { get; set; }
        public ApplicationUser? UploadedBy { get; set; }

        public Guid? CourseId { get; set; }
        public Course? RelatedTo { get; set; }

        public Guid? ModuleId { get; set; }
        

        public Guid? ActivityId { get; set; }
        public Activity? PartOf { get; set; }

        public string? status { get; set; }

    }
}

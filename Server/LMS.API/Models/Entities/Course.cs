using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace LMS.API.Models.Entities
{
    public class Course
    {
        //Primary key Guid
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Course is a required field.")]
        public string CourseName { get; set; }

        public string Description {  get; set; }

        DateTime StartDate {  get; set; }

        //Navigation property for Artifacts
        public virtual ICollection<Artifact> Artifacts { get; set; }

    }
}

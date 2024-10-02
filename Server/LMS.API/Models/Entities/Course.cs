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

        public DateTime StartDate {  get; set; }

        public string CourseCode { get; set; }

        public DateTime EndDate { get; set; }

        public  double Credits { get; set; }

        //Navigation property for Artifacts
        public ICollection<Artifact>? Artifacts { get; set; }

        public ICollection<ApplicationUser>? users { get; set; }

        public ICollection<Module>? Modules { get; set; }
    }
}

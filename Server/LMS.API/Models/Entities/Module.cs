using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMS.API.Models.Entities
{
    public class Module
    {
        [Key]
        public Guid Id {  get; set; }

        [Required]
        public string ModuleName { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        //Foreign key 
        [ForeignKey("Course")]
        public Guid CourseId { get; set; }

        //Navigation properties
        public  ICollection<Activity>? Activities { get; set; }
        public  ICollection<Artifact>? Artifacts { get; set; }
    }
}

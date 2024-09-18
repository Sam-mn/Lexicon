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
        public virtual Course Course { get; set; }

        //Navigation properties
        public virtual ICollection<Activity> Activities { get; set; }
        public virtual ICollection<Artifact> Artifacts { get; set; }
    }
}

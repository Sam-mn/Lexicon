using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMS.API.Models.Entities
{
    public class Activity
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
        //Foreign key
        [ForeignKey("ActivityType")]
        public Guid ActivityTypeId { get; set; }
        public ActivityType? ActivityType { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public Guid ModuleId { get; set; }
        public Module Module { get; set; }

        public Guid CourseId { get; set; }

        //Navigation property for Artifacts
        public virtual ICollection<Artifact>? Artifacts { get; set; }
    }
}

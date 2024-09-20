using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace LMS.API.Models.Entities
{
    public class ActivityType
    {
        [Key]
        public Guid Id { get; set; }

        public string ActivityTypeName { get; set; }

        public string Type { get; set; }

        public string Description { get; set; }

        public ICollection<Activity>? Activities { get; set; }
    }
}

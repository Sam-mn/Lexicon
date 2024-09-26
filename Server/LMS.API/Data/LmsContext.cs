using LMS.API.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace LMS.API.Data
{
    public class LmsContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public LmsContext(DbContextOptions<LmsContext> options) : base(options)
        {
        }
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Module> Module => Set<Module>();
        public DbSet<Activity> Activity => Set<Activity>();
        public DbSet<Artifact> Artifact => Set<Artifact>();

        public DbSet<ActivityType> ActivityType => Set<ActivityType>();
    }
}

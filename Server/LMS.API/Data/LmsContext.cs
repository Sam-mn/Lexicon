using LMS.API.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LMS.API.Data
{
    public class LmsContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public LmsContext(DbContextOptions<LmsContext> options) : base(options)
        {
        }

    }
}

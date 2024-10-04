using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LMS.API.Data;
using LMS.API.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace LMS.API.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly LmsContext _context;
        public UsersController(LmsContext context)
        {
            _context = context;

        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

        //GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsersId(string id)
        {
            var user = await _context.Users
                .Include(u => u.Artifacts)
                .Include(u => u.Course)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound(id);
            }

            return Ok(user);
        }


    }
}

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
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound(id);
            }

            return Ok(user);
        }

        //PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(string id, ApplicationUser user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //Bool logic for if user exists
        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> PostUser(string id, ApplicationUser user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

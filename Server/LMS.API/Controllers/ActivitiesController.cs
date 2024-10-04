using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LMS.API.Data;
using LMS.API.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using LMS.API.Models.Dtos;

namespace LMS.API.Controllers
{
    [Route("api/Activities")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly LmsContext _context;
        public ActivitiesController(LmsContext context)
        {
            _context = context;

        }

        // GET: api/Activities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivity()
        {
            return await _context.Activity.ToListAsync();
        }

        // GET: api/Activities
        [HttpGet("courseActivity")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetAssignments()
        {
            var test = await _context.Activity.Include(c=>c.ActivityType).Where( a=>a.ActivityType!.ActivityTypeName == "Assignment").ToListAsync();
            return await _context.Activity.Include(c=>c.ActivityType).Where( a=>a.ActivityType!.ActivityTypeName == "Assignment").ToListAsync();

        }

        //GET: api/Activities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivitiesDto>> GetActivity(Guid id)
        {
            var activity = await _context.Activity.Include(c => c.ActivityType).Select((a) => new ActivitiesDto
            {
                Id = a.Id,
                Description = a.Description,
                Name = a.Name,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                ActivityTypeName = a.ActivityType.ActivityTypeName
            }).FirstOrDefaultAsync(a => a.Id == id);

            if (activity == null)
            {
                return NotFound();
            }

            return activity;
        }

        // PUT: api/Activities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivity(Guid id, Activity activity)
        {
            if (id != activity.Id)
            {
                return BadRequest();
            }

            _context.Entry(activity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityExists(id))
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

        // POST: api/Activities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Activity>> PostActivity(Activity activity)
        {
            _context.Activity.Add(activity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivity", new { id = activity.Id }, activity);
        }

        // DELETE: api/Activities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var activity = await _context.Activity.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            _context.Activity.Remove(activity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivityExists(Guid id)
        {
            return _context.Activity.Any(e => e.Id == id);
        }
    }
}

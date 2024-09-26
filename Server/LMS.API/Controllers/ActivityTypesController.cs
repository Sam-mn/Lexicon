using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LMS.API.Data;
using LMS.API.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace LMS.API.Controllers
{
    [Route("api/ActivityTypes")]
    [ApiController]
    public class ActivityTypesController : ControllerBase
    {
        private readonly LmsContext _context;
        public ActivityTypesController(LmsContext context)
        {
            _context = context;

        }

        // GET: api/ActivityType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityType>>> GetActivityType()
        {
            return await _context.ActivityType.ToListAsync();
        }

        //GET: api/ActivityType/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityType>> GetActivityType(Guid id)
        {
            var activityType = await _context.ActivityType.FindAsync(id);

            if (activityType == null)
            {
                return NotFound();
            }

            return activityType;
        }

        // PUT: api/ActivityType/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityType(Guid id, ActivityType activityType)
        {
            if (id != activityType.Id)
            {
                return BadRequest();
            }

            _context.Entry(activityType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityTypeExists(id))
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

        private bool ActivityTypeExists(Guid id)
        {
            throw new NotImplementedException();
        }

        // POST: api/ActivityType
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ActivityType>> PostActivityType(ActivityType activityType)
        {
            _context.ActivityType.Add(activityType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityType", new { id = activityType.Id }, activityType);
        }

        // DELETE: api/ActivityType/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivityType(Guid id)
        {
            var activityType = await _context.ActivityType.FindAsync(id);
            if (activityType == null)
            {
                return NotFound();
            }

            _context.ActivityType.Remove(activityType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}

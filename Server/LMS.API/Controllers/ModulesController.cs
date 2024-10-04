using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LMS.API.Data;
using LMS.API.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using LMS.API.Models.Dtos;

namespace LMS.API.Controllers
{
    [Route("api/modules")]
    [ApiController]
    public class ModulesController : ControllerBase
    {
        private readonly LmsContext _context;
        public ModulesController(LmsContext context)
        {
            _context = context;

        }

        // GET: api/modules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Module>>> GetModule()
        {
            return await _context.Module.ToListAsync();
        }

        //GET: api/modules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Module>> GetModule(Guid id)
        {
            var module = await _context.Module.Include(c=>c.Activities).Include(c=>c.Artifacts).FirstOrDefaultAsync(c=>c.Id == id);

            if (module == null)
            {
                return NotFound();
            }

            return module;
        }

        //GET: api/modules/5/activities
        [HttpGet("{id}/activities")]
        public async Task<ActionResult<IEnumerable<ActivitiesDto>>> GetModulesActivities(Guid id)
        {
            var activity = await _context.Activity.Where(c => c.ModuleId == id).Include(c=> c.ActivityType).Select((a) =>  new ActivitiesDto
            {
                Id = a.Id,
                Description= a.Description,
                Name = a.Name,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                ActivityTypeName = a.ActivityType.ActivityTypeName
            }).ToListAsync();

            if (activity == null)
            {
                return NotFound();
            }

            return activity;
        }

        // PUT: api/modules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModule(Guid id, Module module)
        {
            if (id != module.Id)
            {
                return BadRequest();
            }

            _context.Entry(module).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModuleExists(id))
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

        // POST: api/modules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostModule(Module module)
        {
            _context.Module.Add(module);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetModule", new { id = module.Id }, module);
        }

        // DELETE: api/modules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModule(Guid id)
        {
            var module = await _context.Module.FindAsync(id);
            if (module == null)
            {
                return NotFound();
            }

            _context.Module.Remove(module);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ModuleExists(Guid id)
        {
            return _context.Module.Any(e => e.Id == id);
        }
    }
}

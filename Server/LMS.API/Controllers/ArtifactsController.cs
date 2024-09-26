using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LMS.API.Data;
using LMS.API.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace LMS.API.Controllers
{
    [Route("api/Artifacts")]
    [ApiController]
    public class ArtifactsController : ControllerBase
    {
        private readonly LmsContext _context;
        public ArtifactsController(LmsContext context)
        {
            _context = context;

        }

        // GET: api/Artifacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artifact>>> GetArtifact()
        {
            return await _context.Artifact.ToListAsync();
        }

        //GET: api/Artifacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Artifact>> GetArtifact(Guid id)
        {
            var artifact = await _context.Artifact.FindAsync(id);

            if (artifact == null)
            {
                return NotFound();
            }

            return artifact;
        }

        // PUT: api/Artifacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtifact(Guid id, Artifact artifact)
        {
            if (id != artifact.Id)
            {
                return BadRequest();
            }

            _context.Entry(artifact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtifactExists(id))
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

        // POST: api/Artifacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Artifact>> PostActivity(Artifact artifact)
        {
            _context.Artifact.Add(artifact);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivity", new { id = artifact.Id }, artifact);
        }

        // DELETE: api/Artifacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtifact(Guid id)
        {
            var artifact = await _context.Artifact.FindAsync(id);
            if (artifact == null)
            {
                return NotFound();
            }

            _context.Artifact.Remove(artifact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArtifactExists(Guid id)
        {
            return _context.Artifact.Any(e => e.Id == id);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorldCitiesAPI.Data;
using WorldCitiesAPI.Data.Models;
//using System.Linq.Dynamic.Core;

namespace WorldCitiesAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CitiesController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public CitiesController(ApplicationDbContext context)
		{
			_context = context;
		}

		// GET: api/Cities
		// GET: api/Cities/?pageIndex=0&pageSize=10
		// GET: api/Cities/?pageIndex=0&pageSize=10&sortColumn=name&sortOrder=asc
		[HttpGet]
		public async Task<ActionResult<ApiResult<City>>> GetCities(
			int pageIndex = 0, 
			int pageSize = 10,
			string? sortColumn = null,
			string? sortOrder = null,
			string? filterColumn = null,
			string? filterQuery = null)
		{
			return await ApiResult<City>.CreateAsync(_context.Cities.AsNoTracking(),
				pageIndex, 
				pageSize,
				sortColumn,
				sortOrder,
				filterColumn,
				filterQuery);
		}

		// GET: api/Cities
		// GET: api/Cities/?pageIndex=0&pageSize=10
		// GET: api/Cities/?pageIndex=0&pageSize=10&sortColumn=name&sortOrder=asc
		[HttpGet("otherfilter")]
		public async Task<ActionResult<ApiResult<City>>> GetCitiesOtherFilter(
			int pageIndex = 0,
			int pageSize = 10,
			string? sortColumn = null,
			string? sortOrder = null,
			string? filterColumn = null,
			string? filterQuery = null)
		{
			// first we perform the filtering...
			var cities = _context.Cities;

			if (!string.IsNullOrEmpty(filterColumn) && !string.IsNullOrEmpty(filterQuery))
			{
				cities = (DbSet<City>)cities.Where(c => c.Name.StartsWith(filterQuery));
			}

			// ... and then we call the ApiResult
			return await ApiResult<City>.CreateAsync(
				//_context.Cities.AsNoTracking(), 
				cities.AsNoTracking(),
				pageIndex,
				pageSize,
				sortColumn,
				sortOrder);
		}

		// GET: api/Cities
		[HttpGet("sinApiResult")]
		public async Task<ActionResult<IEnumerable<City>>> GetCitiesSinApiResult(int pageIndex = 0, int pageSize = 10)
		{
			return await _context.Cities
				.Skip(pageIndex * pageSize)
				.Take(pageSize)
				.ToListAsync();
		}

		// GET: api/Cities/5
		[HttpGet("{id}")]
		public async Task<ActionResult<City>> GetCity(int id)
		{
			var city = await _context.Cities.FindAsync(id);

			if (city == null)
			{
				return NotFound();
			}

			return city;
		}

		// PUT: api/Cities/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutCity(int id, City city)
		{
			if (id != city.Id)
			{
				return BadRequest();
			}

			_context.Entry(city).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CityExists(id))
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

		// POST: api/Cities
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<City>> PostCity(City city)
		{
			_context.Cities.Add(city);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetCity", new { id = city.Id }, city);
		}

		// DELETE: api/Cities/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCity(int id)
		{
			var city = await _context.Cities.FindAsync(id);
			if (city == null)
			{
				return NotFound();
			}

			_context.Cities.Remove(city);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool CityExists(int id)
		{
			return _context.Cities.Any(e => e.Id == id);
		}

		[HttpPost]
		[Route("IsDupeCity")]
		public bool IsDupeCity(City city)
		{
			return _context.Cities.Any(
				c => c.Name == city.Name
				&& c.Lat == city.Lat
				&& c.Lon == city.Lon
				&& c.CountryId == city.CountryId
				&& c.Id != city.Id
			);
		}
	}
}

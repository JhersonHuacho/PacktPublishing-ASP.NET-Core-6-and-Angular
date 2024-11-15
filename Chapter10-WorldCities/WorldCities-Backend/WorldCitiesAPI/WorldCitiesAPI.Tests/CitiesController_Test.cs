using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorldCitiesAPI.Controllers;
using WorldCitiesAPI.Data;
using WorldCitiesAPI.Data.Models;

namespace WorldCitiesAPI.Tests
{
	public class CitiesController_Test
	{
		/// <summary>
		/// Test the GetCity() method of the CitiesController
		/// </summary>
		[Fact]
		public async Task GetCity_ReturnsCity()
		{
			// Arrange
			// todo: define the required assets
			var options = new DbContextOptionsBuilder<ApplicationDbContext>()
				.UseInMemoryDatabase(databaseName: "WorldCities")
				.Options;

			using var context = new ApplicationDbContext(options);

			context.Add(new City()
			{
				Id = 1,
				CountryId = 1,
				Lat = 1,
				Lon = 1,
				Name = "TestCity"
			});

			context.SaveChanges();

			var controller = new CitiesController(context);
			City? city_existing = null;
			City? city_notExisting = null;

			// Act
			// todo: invoke the test
			city_existing = (await controller.GetCity(1)).Value;
			city_notExisting = (await controller.GetCity(2)).Value;

			// Assert
			// todo: verifiy that conditions are met
			Assert.NotNull(city_existing);
			Assert.Null(city_notExisting);
		}
	}
}
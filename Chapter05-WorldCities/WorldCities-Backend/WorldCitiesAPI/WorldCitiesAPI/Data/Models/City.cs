using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WorldCitiesAPI.Data.Models
{
	public class City
	{
		#region Properties
		/// <summary>
		/// The unique id and primary key for this City
		/// </summary>
		[Key]
		[Required]
		public int Id { get; set; }
		/// <summary>
		/// City name (in UTF8 format)
		/// </summary>
		public string Name { get; set; } = null!;
		/// <summary>
		/// City latitude
		/// </summary>
		[Column(TypeName = "decimal(7,4)")]
		public decimal Lat { get; set; }
		/// <summary>
		/// City longitude
		/// </summary>
		[Column(TypeName = "decimal(7,4)")]
		public decimal Lon { get; set; }
		/// <summary>
		/// Country Id (foreign key)
		/// </summary>
		public int CountryId { get; set; }
		#endregion
	}
}

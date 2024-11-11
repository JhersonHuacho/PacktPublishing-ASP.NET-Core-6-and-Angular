using Microsoft.EntityFrameworkCore;
using WorldCitiesAPI.Data.Models;

namespace WorldCitiesAPI.Data
{
	public class ApplicationDbContext : DbContext
	{
        public ApplicationDbContext() : base()
        {
            
        }

        public ApplicationDbContext(DbContextOptions options): base(options)
        {
            
        }

		public DbSet<City> Cities { get; set; }
		public DbSet<Country> Countries { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			
			// add the EntityTypeConfiguration classes
			modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

			//modelBuilder.Entity<City>().ToTable("Cities");
			//modelBuilder.Entity<City>().HasKey(x => x.Id);
			//modelBuilder.Entity<City>().Property(x => x.Id).IsRequired();
			//modelBuilder.Entity<City>().Property(x => x.Lat).HasColumnType("decimal(7,4)");
			//modelBuilder.Entity<City>().Property(x => x.Lon).HasColumnType("decimal(7,4)");
			//modelBuilder.Entity<City>()
			//	.HasOne(x => x.Country)
			//	.WithMany(y => y.Cities)
			//	.HasForeignKey(x => x.CountryId);

			//modelBuilder.Entity<Country>().ToTable("Countries");
			//modelBuilder.Entity<Country>().HasKey(x => x.Id);
			//modelBuilder.Entity<Country>().Property(x => x.Id).IsRequired();
		}
	}
}

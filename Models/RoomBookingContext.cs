using Microsoft.EntityFrameworkCore;

namespace RoomBooking.Models
{
    public class RoomBookingContext : DbContext
    {
        public RoomBookingContext(DbContextOptions<RoomBookingContext> options)
            : base(options)
        {
        }
        public DbSet<Room> Rooms { get; set; }

        public DbSet<Reservation> Reservations { get; set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Reservation>(entity =>
            {
                entity
                    .Property(e => e.RoomId)
                    .IsRequired();
            });

            modelBuilder.Entity<Room>(entity =>
            {
                entity
                    .HasMany(d => d.Reservations);
            });
        }
    }
}
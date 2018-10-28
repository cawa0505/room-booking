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
    }
}
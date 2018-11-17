using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
namespace RoomBooking.Models
{

  public class ApplicationRole : IdentityRole<Guid> { }

  public class RoomBookingContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
  {
    public RoomBookingContext(DbContextOptions<RoomBookingContext> options)
        : base(options)
    {
    }
    public DbSet<Room> Rooms { get; set; }

    public DbSet<Reservation> Reservations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.Entity<ApplicationUser>().ToTable("Users");
      modelBuilder.Entity<Reservation>(entity =>
      {
        entity
          .HasOne(r => r.Room)
          .WithMany(res => res.Reservations)
          .HasForeignKey(r => r.RoomId);
      });

      modelBuilder.Entity<Room>(entity =>
      {
        entity
          .HasMany(d => d.Reservations)
          .WithOne(r => r.Room);
      });
    }
  }
}
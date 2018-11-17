using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RoomBooking.Models;
using Microsoft.EntityFrameworkCore;

namespace RoomBooking.Controllers
{
  [Route("api/[controller]")]
  [Produces("application/json")]
  [ApiController]
  public class ReservationController : Controller
  {
    private readonly RoomBookingContext _context;

    public ReservationController(RoomBookingContext context)
    {
      _context = context;
    }

    [HttpGet]
    public ActionResult<List<Reservation>> GetAll()
    {
      return _context
          .Reservations
          .Include("Room")
          .ToList();
    }

    [HttpGet("{id}", Name = "GetReservation")]
    public ActionResult<Reservation> GetOneById(long id)
    {
      var item = _context.Reservations.Find(id);
      if (item == null)
      {
        return NotFound();
      }
      _context.Entry(item).Reference("Room").Load();
      return item;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Reservation reservation)
    {
      await _context.Reservations.AddAsync(reservation);
      await _context.SaveChangesAsync();

      return CreatedAtRoute("GetReservation", new { id = reservation.Id }, reservation);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(long id)
    {
      var todo = _context.Reservations.Find(id);
      if (todo == null)
      {
        return NotFound();
      }

      _context.Reservations.Remove(todo);
      _context.SaveChanges();
      return NoContent();
    }

  }
}

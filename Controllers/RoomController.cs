using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RoomBooking.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace RoomBooking.Controllers
{
  [Route("api/[controller]")]
  [Produces("application/json")]
  [ApiController]
  [Authorize]
  public class RoomController : Controller
  {
    private readonly RoomBookingContext _context;

    public RoomController(RoomBookingContext context)
    {
      _context = context;

      if (_context.Rooms.Count() == 0)
      {
        _context.Rooms.Add(new Room
        {
          Location = "A302",
          Floor = 3,
          Size = 6,
          Type = RoomType.Group
        });
        _context.SaveChanges();
      }
    }

    [HttpGet]
    public ActionResult<List<Room>> GetAll()
    {
      return _context
        .Rooms
        .Include(room => room.Reservations)
        .ToList();
    }

    [HttpGet("{id}", Name = "GetRoom")]
    public ActionResult<Room> GetOneById(long id)
    {
      var item = _context.Rooms.Find(id);
      if (item == null)
      {
        return NotFound();
      }
      return item;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Room room)
    {
      await _context.Rooms.AddAsync(room);
      await _context.SaveChangesAsync();

      return CreatedAtRoute("GetRoom", new { id = room.Id }, room);
    }

  }
}

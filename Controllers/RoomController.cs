using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RoomBooking.Models;

namespace RoomBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : Controller
    {
        private readonly RoomBookingContext _context;

        public RoomController(RoomBookingContext context)
        {
          _context = context;

          if (_context.Rooms.Count() == 0)
            {
                _context.Rooms.Add(new Room { Name = "A302" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<List<Room>> GetAll()
        {
          return _context.Rooms.ToList();
        }
        
        [HttpGet("{id}", Name = "GetRoom")]
        public ActionResult<Room> GetOneById(long id)
        {
          var item = _context.Rooms.Find(id);
          if(item == null)
          {
            return NotFound();
          }
          return item;
        }

        [HttpPost]
        public IActionResult Create(Room room)
        {
          _context.Rooms.Add(room);
          _context.SaveChanges();

          return CreatedAtRoute("GetRoom", new { id = room.Id }, room);
        }

  }
} 

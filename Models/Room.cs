using System;
using System.Collections.Generic;

namespace RoomBooking.Models
{
    public class Room
    {
        public Room()
        {
            Reservations = new HashSet<Reservation>();
        }
        public long Id { get; set; }
        public string Location { get; set; }
        public int Floor { get; set; }

        public int Size { get; set; }

        public RoomType Type { get; set; }

        public ICollection<Reservation> Reservations {get; set;}
    }
}
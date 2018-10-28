using System;

namespace RoomBooking.Models
{
    public class Reservation
    {
        public long Id { get; set; }
        public string ReservedBy { get; set; }

        public Room Room {get; set;}

        public DateTime StartTime { get; set;}

        public DateTime EndTime {get; set;}

        public double Length {get; set;}

        public Reservation(string reservedBy, DateTime startTime, DateTime endTime, Room bookedRoom)
        {
            ReservedBy = reservedBy;
            StartTime = startTime;
            EndTime = endTime;
            Room = bookedRoom;
            Length = (endTime - startTime).TotalHours;
        }
    }
}
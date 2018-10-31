using System;

namespace RoomBooking.Models
{
    public class Reservation
    {
        public long Id { get; set; }
        public string ReservedBy { get; set; }

        public long RoomId {get; set;}

        public DateTime StartTime { get; set;}

        public DateTime EndTime {get; set;}

        public double Length {get; set;}

        public Reservation(string reservedBy, DateTime startTime, DateTime endTime, long roomId)
        {
            ReservedBy = reservedBy;
            StartTime = startTime;
            EndTime = endTime;
            RoomId = roomId;
            Length = (endTime - startTime).TotalHours;
        }
    }
}
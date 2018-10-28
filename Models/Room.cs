namespace RoomBooking.Models
{
    public class Room
    {
        public long Id { get; set; }
        public string Location { get; set; }
        public int Floor { get; set; }

        public int Size { get; set; }

        public RoomType Type { get; set; }
    }
}
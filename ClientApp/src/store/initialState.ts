const initalState = {
  rooms: [],
  reservations: [],
  selectedRoom: {
    id: 0,
    location: "A000",
    floor: 0,
    size: 0,
    type: 0,
    reservations: []
  },
  auth: {
    auth: false,
    user: {
      id: 0,
      username: 'Steffe'
    }
  },
  menu: false
}

export default initalState;
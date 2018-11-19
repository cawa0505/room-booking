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
    loggedIn: false,
    user: ''
  },
  menu: 'login'
}

export default initalState;
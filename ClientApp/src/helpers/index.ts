import { addDays, getHours, getMinutes, setHours, setMinutes, setSeconds, setMilliseconds} from 'date-fns';

export function constructDate(timeSlot, day){
  const hour = getHours(new Date(timeSlot));
  const minutes = getMinutes(new Date(timeSlot));
  let date = setHours(new Date(day), hour);
  date = setMinutes(date, minutes);
  date = setSeconds(date, 0);
  date = setMilliseconds(date, 0);
  return date;
}

export function generateDays() {
  const numberOfDays = 5;
  const days: Date[] = [];
  for(let i = 0; i < numberOfDays; i++){
    days.push(addDays(new Date(), i));
  }
  return days;
}

export function generateTimeSlots(startHour = 8, endHour = 17, intervalMinutes = 60) {

  const timeSlots: Date[] = [];
  let currentTimeSlot = new Date();

  for (let i = startHour; i < endHour; i++) {

    currentTimeSlot = setHours(currentTimeSlot, i);

    for (let j = 0; j < 60; j += intervalMinutes) {
      currentTimeSlot = setMinutes(currentTimeSlot, j);
      currentTimeSlot = setSeconds(currentTimeSlot, 0);
      timeSlots.push(currentTimeSlot);
    }

  }
  return timeSlots;
};
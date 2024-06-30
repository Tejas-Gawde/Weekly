export function convertToISOFromSelected(selectedDate: string, timeObj: any) {
  const { amPm, hours, minutes } = timeObj;

  // Parse the selected date
  const [dayOfWeek, day] = selectedDate.split(' '); // e.g., "Thu 04" -> ["Thu", "04"]

  // Create a new Date object
  const date = new Date();

  // Set the day of the month
  date.setDate(Number(day));

  // Set hours and minutes, converting to 24-hour format if necessary
  date.setHours((hours % 12) + (amPm === 'PM' ? 12 : 0));
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  // Return the ISO string
  return date.toISOString();
}

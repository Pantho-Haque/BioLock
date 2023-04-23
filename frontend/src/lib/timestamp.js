export function newDateAndTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear().toString().substr(-2);
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedTime = formattedHours + ':' + formattedMinutes + ' ' + amOrPm;
  const formattedDate = day + '-' + month + '-' + year;

  const formattedDateTime = formattedTime + ' ' + formattedDate;

  return formattedDateTime; // Output: "12:03 AM 23-03-12"
}

import CALLSIGN from './callsign'


const daysBetween = (date1, date2) => {
  const ONE_DAY =  60 * 60 * 24;
  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);
  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
}


const timeConverter = (timestamp) => {
  var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
      ampm = 'AM'
      if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
      } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
      } else if (hh === 0) {
          h = 12;
      }
 
  // ie: 2014-03-24, 3:00 PM
  var date = mm + '/' + dd + '/' + yyyy + ', ' + h + ':' + min + ' ' + ampm;
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  date = new Date(date)
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return {
      day: day + ' ' + monthNames[monthIndex] + ' ' + year, 
      hour: h + ':' + min + ' ' + ampm
    }
}


const getAirlineName = (code) =>{
  const list = CALLSIGN.AIRLINES.list
  const airline = list.filter( a => a.id === code )
  return airline[0].name
}

const secondsToHours = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":").split(":").slice(0,2).join("h ") + "m"
}

export { timeConverter, getAirlineName, secondsToHours, daysBetween }
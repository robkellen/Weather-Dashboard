//access local storage
function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    $(`#text${key}`).text(value);
  }
}

//declaring HTML variables
const geoLocation = {};
const todaysDate = moment().format("MM-DD-YYYY");

//execute the following function after page is fully loaded
$(document).ready(function () { 
  //adding current date to header of today's forecast
  $("#currentDate").text(todaysDate);
});
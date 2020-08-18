//access local storage
function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    $(`#text${key}`).text(value);
  }
}

const geoLocation = {};


//execute the following function after page is fully loaded
$(document).ready(function () {

}
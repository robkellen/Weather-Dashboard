//access local storage
function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    $(`#text${key}`).text(value);
  }
}

//declaring HTML variables
const geoLocation = document.getElementById("#todayForecast")
const todaysDate = moment().format("M-DD-YYYY");


//execute the following function after page is fully loaded
$(document).ready(function () { 
  //adding current date to header of today's forecast
  $("#currentDate").text(todaysDate);

  //event function to trigger the AJAX call for city that user searches
  $("#findCity").on("click", function(event){
    event.preventDefault();
    //collecting the text from the input box
    const city = $("#cityInput").val();

    const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d"
    //url for the AJAX call query including user input and API key
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",&appid=" + apiKey;
    //running AJAX call to OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      //console logging queryURL
      console.log(queryURL);
      //console logging resulting object
      console.log(response);

    })
  })


  
});
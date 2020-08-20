var savedLocations = [];


//ask user to allow access to location
function geoLocation (){
  navigator.geolocation();
}

function startPoint (){
  //if user declines provide weather info for Cave Creek, AZ
  if (!navigator.geolocation) {
    getCurrent("Chicago");
  } else {
    navigator.geolocation.getCurrentPosition(allowed, denied);
  }
}

function allowed (position){
  
  //obtaining info for lat/long
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d"
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    city = response.name;
    getCurrent(city);
    
  });
}
//if user blocks permission to access location set default weather to city of Chicago
function denied (){
  city = "Chicago";
  getCurrent(city);
}

function temperature (){
  
}

function getCurrent(city) {

  const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d"
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" + city + ",&appid=" + apiKey;

  // $("#findCity").on("click", function(){
  //   event.preventDefault
  //   const city = $("#cityInput").val().trim();

  // })

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    //console logging queryURL
    console.log(queryURL);
    //console logging resulting object
    console.log(response);

    //set current city and append to HTML
    const city = (response.name);
    $("#currentCity").text(city)
    //set current date and append to HTML
    const todayDate = moment().format(" (M-D-YYYY) ");
    $("#currentDate").text(todayDate);
    //variable for weather icon based on current conditions
    const iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    //set weather icon to the HTML
    const iconDiv = $("<div>").attr("class", "col-md-3").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
    $("#iconHere").append(iconDiv);
    //set weather info to HTML
    $("#currentHeader").append("<ul>").attr("id", "currentStats");
    const temperature = $("<li>").text("Temperature: " + response.main.temp + " °F");
    $("#currentStats").append(temperature);
    const humidity = $("<li>").text("Humidity: " + response.main.humidity + " %");
    $("#currentStats").append(humidity);
    const windspeed = $("<li>").text("Wind Speed: " + response.wind.speed + " MPH");
    $("#currentStats").append(windspeed);
    getUvi(city);
    });
    // getUvi();
}

function getUvi (){


}







// function saveCitySearch ()

startPoint();
getCurrent

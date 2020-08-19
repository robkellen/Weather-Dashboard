var savedLocations = [];
var city;

//ask user to allow access to location
function geoLocation (){
  navigator.geolocation();
}

function startPoint (){
  //if user declines provide weather info for Cave Creek, AZ
  if (!navigator.geolocation) {
    getWeather("Cave Creek");
  } else {
    navigator.geolocation.getCurrentPosition(allowed, denied);
  }
}

function allowed (position){
  
  //obtaining info for lat/long
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d"
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    //console logging queryURL
    console.log(queryURL);
    //console logging resulting object
    console.log(response);
    
});
}

function denied (){
  city = "Cave Creek"
  getCurrent(city);
}


function getCurrent () {
  const city = "chicago"
  const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d"
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",&appid=" + apiKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    //console logging queryURL
    console.log(queryURL);
    //console logging resulting object
    console.log(response);

});
}
startPoint();

const savedLocations = [];
const geoLocation = "";



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
getCurrent();

var savedLocations = [];

//ask user to allow access to location
function geoLocation() {
  navigator.geolocation();
}

function startPoint() {
  //if user declines provide weather info for Cave Creek, AZ
  if (!navigator.geolocation) {
    getCurrent("Chicago");
  } else {
    navigator.geolocation.getCurrentPosition(allowed, denied);
  }
}

const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d";

function allowed(position) {
  //obtaining info for lat/long
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    city = response.name;
    getCurrent(city);
  });
}
//if user blocks permission to access location set default weather to city of Chicago
function denied() {
  city = "Chicago";
  getCurrent(city);
}

function temperature() {}

function getCurrent(city) {
  const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d";
  const queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" +
    city +
    ",&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //console logging queryURL
    console.log(queryURL);
    //console logging resulting object
    console.log(response);

    //set current city and append to HTML
    const city = response.name;
    $("#currentCity").text(city);
    //set current date and append to HTML
    const todayDate = moment().format(" (M-D-YYYY) ");
    $("#currentDate").text(todayDate);
    //variable for weather icon based on current conditions
    const iconURL =
      "https://openweathermap.org/img/wn/" +
      response.weather[0].icon +
      "@2x.png";
    //set weather icon to the HTML
    const iconDiv = $("<div>")
      .attr("class", "col-md-3")
      .append($("<img>").attr("src", iconURL).attr("class", "card-img"));
    $("#iconHere").append(iconDiv);
    //set weather info to HTML
    $("#currentHeader").append("<ul>").attr("id", "currentStats");
    const temperature = $("<li>").text(
      "Temperature: " + response.main.temp + " °F"
    );
    $("#currentStats").append(temperature);
    const humidity = $("<li>").text(
      "Humidity: " + response.main.humidity + " %"
    );
    $("#currentStats").append(humidity);
    const windspeed = $("<li>").text(
      "Wind Speed: " + response.wind.speed + " MPH"
    );
    $("#currentStats").append(windspeed);

    const cityLat = response.coord.lat;
    const cityLon = response.coord.lon;

    const queryURL2 =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      apiKey +
      "&lat=" +
      cityLat +
      "&lon=" +
      cityLon;

    $.ajax({
      url: queryURL2,
      method: "GET",
    }).then(function (uviResponse) {
      //console logging queryURL
      console.log(queryURL);
      //console logging resulting object
      console.log(uviResponse);

      const uvIndex = uviResponse.value;

      var indexColor = "";
      //determining background color for UV index when displayed
      //console.log(7.34 > 6)
      if (uvIndex <= 3) {
        indexColor = "green";
      }
      if (uvIndex >= 3 || uvIndex <= 6) {
        indexColor = "yellow";
      }
      if (uvIndex >= 6 || uvIndex <= 8) {
        indexColor = "orange";
      } 
      if (uvIndex > 9) {
        indexColor = "red";
      }
      //display UV index to HTML
      const displayUvi = $("<li>").text("UV Index: ");
      displayUvi.append(
        $("<span>")
          .attr("class", "uvindex")
          .css("background-color", indexColor)
          .text(uvIndex)
      );
      $("#currentStats").append(displayUvi);

    });
    getForecast(response.id);
  });
}

function getForecast(city) {
  const queryURL3 =
    "http://api.openweathermap.org/data/2.5/forecast?id=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";

  $.ajax({
    url: queryURL3,
    method: "GET",
  }).then(function (forecast) {
    console.log(forecast);

    for (let i = 0; i < forecast.list.length; i++) {
      //start for loop at index 0 of forecast list and search for upcoming dates at time of 15:00
      if (forecast.list[i].dt_txt.indexOf("15:00:00") !== -1) {
        //create new column for each day of the forecast
        const newCol = $("<div>").attr("class", "col");
        $("#fiveDay").append(newCol);
        //create new card to display forecast info for each day
        const newCard = $("<div>").attr("class", "card text-white bg-primary");
        newCol.append(newCard);
        //create header for new card and display 
        var cardHeader = $("<div>").attr("class", "card-header").text(moment(forecast.list[i].dt, "X").format("MMM Do"));
        newCard.append(cardHeader);
        //append icon for weather to cards
        var cardImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + "@2x.png");
        newCard.append(cardImg);
        //new div to hold info for text/humidity on each card of forecast
        var bodyDiv = $("<div>").attr("class", "card-body");
        newCard.append(bodyDiv);
        //
        bodyDiv.append($("<p>").attr("class", "card-text").html("Temp: " + forecast.list[i].main.temp + " °F"));
        bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + forecast.list[i].main.humidity + "%"));
    }

  };
});
}

// function saveCitySearch ()

startPoint();

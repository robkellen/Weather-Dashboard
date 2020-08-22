var savedLocations = [];
var city;

//ask user to allow access to location
function geoLocation() {
  navigator.geolocation();
}

function startPoint() {
  //check local storage for previously searched and stored locations
  const savedLocations = JSON.parse(localStorage.getItem("weathercities"));
  var lastSearch;
  if (savedLocations) {
    //get last city searched and display it
    city = savedLocations[savedLocations.length - 1];
    showPrevious();
    getCurrent(city);
  } else {
    //if user declines provide weather info for Chicago
    if (!navigator.geolocation) {
      getCurrent("Chicago");
    } else {
      navigator.geolocation.getCurrentPosition(allowed, denied);
    }
  }
}
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

function showPrevious() {
  //show most recent searched city's info
  if (savedLocations) {
    $("#prevSearches").empty();

    const cityBtns = $("<div>").attr("class", "list-group");
    //create new list item of a button for city searched.
    for (let i = 0; i < savedLocations.length; i++) {
      const locButton = $("<a>")
        .attr("href", "#")
        .attr("id", "locationButtons")
        .text(savedLocations[i]);
      if (savedLocations[i] == city) {
        locButton.attr(
          "class",
          "list-group-item list-group-item-action active"
        );
      } else {
        locButton.attr("class", "list-group-item list-group-item-action");
      }
      //place current search button at top of list
      cityBtns.prepend(locButton);
      //append to HTML
      $("#prevSearches").append(cityBtns);
    }
  }
}

const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d";

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
    error: function () {
      savedLocations.splice(savedLocations.indexOf(location), 1);
      localStorage.setItem("city", JSON.stringify(savedLocations));
    },
  }).then(function (response) {
    //console logging queryURL
    console.log(queryURL);
    //console logging resulting object
    console.log(response);

    const todayDate = moment().format(" (M-D-YYYY) ");
    //create new row
    const addRow = $("<div>")
      .attr("class", "row card")
      .attr("id", "currentRow");
      $("#containerRight").append(addRow);
    //create div to hold daily data
    const currForecast = $("<div>").attr("class", "col");
    addRow.append(currForecast);
    //add location & date to card header
    const cardHead = $("<div>")
      .attr("class", "card-header")
      .attr("id", "cardHeader");
    currForecast.append(cardHead);
    const cityHead = $("<h5>").text(city);
    cardHead.append(cityHead);

    const cardRow = $("<div>").attr("class", "row");
    currForecast.append(cardRow);

    //variable for weather icon based on current conditions
    const iconURL =
      "https://openweathermap.org/img/wn/" +
      response.weather[0].icon +
      "@2x.png";
    //set weather icon to the HTML
    const iconDiv = $("<div>")
      .attr("class", "col-md-3")
      .append($("<img>").attr("src", iconURL).attr("class", "card-img"));
    cardRow.append(iconDiv);

    const textDiv = $("<div>").attr("class", "col-md-8");
    cardRow.append(textDiv);
    const cardBody = $("<div>").attr("class", "card-body");
    textDiv.append(cardBody);
    cardBody.append(
      $("<h3>")
        .attr("class", "card-title")
        .text(city + todayDate)
    );

    //set weather info to HTML
    cardBody.append("<ul>").attr("id", "currentStats");
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

function getForecast(location) {
  const queryURL3 =
    "http://api.openweathermap.org/data/2.5/forecast?id=" +
    location +
    "&appid=" +
    apiKey +
    "&units=imperial";

  $.ajax({
    url: queryURL3,
    method: "GET",
  }).then(function (forecast) {
    console.log(forecast);

    const newRow = $("<div>").attr("id", "#fiveDay").attr("class", "row");
    $("#containerRight").append(newRow);
    
    for (let i = 0; i < forecast.list.length; i++) {
      //start for loop at index 0 of forecast list and search for upcoming dates at time of 15:00
      if (forecast.list[i].dt_txt.indexOf("15:00:00") !== -1) {
        //create new column for each day of the forecast
        const newCol = $("<div>").attr("class", "col");
        newRow.append(newCol);
        //create new card to display forecast info for each day
        const newCard = $("<div>").attr("class", "card text-white bg-primary");
        newCol.append(newCard);
        //create header for new card and display
        var cardHeader = $("<div>")
          .attr("class", "card-header")
          .text(moment(forecast.list[i].dt, "X").format("MMM Do"));
        newCard.append(cardHeader);
        //append icon for weather to cards
        var cardImg = $("<img>")
          .attr("class", "card-img-top")
          .attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              forecast.list[i].weather[0].icon +
              "@2x.png"
          );
        newCard.append(cardImg);
        //new div to hold info for text/humidity on each card of forecast
        var bodyDiv = $("<div>").attr("class", "card-body");
        newCard.append(bodyDiv);
        //
        bodyDiv.append(
          $("<p>")
            .attr("class", "card-text")
            .html("Temp: " + forecast.list[i].main.temp + " °F")
        );
        bodyDiv.append(
          $("<p>")
            .attr("class", "card-text")
            .text("Humidity: " + forecast.list[i].main.humidity + "%")
        );
      }
    }
  });
}

function clear() {
  //clear previous weather info
  $("#containerRight").empty();
}

var loc;
function saveCitySearch(loc) {
  //check local storage.  if none add this city to new array
  if (savedLocations === null) {
    savedLocations = [loc];
  } else if (savedLocations.indexOf(loc) === -1) {
    savedLocations.push(loc);
  }
  localStorage.setItem("city", JSON.stringify(savedLocations));
  showPrevious();
}

$("#findCityBtn").on("click", function (event) {
  //prevent default refresh
  event.preventDefault();
  //take value from user input
  var loc = $("#cityInput").val().trim();
  if (loc !== "") {
    //clear previous forecast data
    clear();
    city = loc;
    saveCitySearch(loc);

    $("#cityInput").val("");

    getCurrent(loc);
  }

  $(document).on("click", "loc-btn", function () {
    clear();
    city = $(this).text();
    showPrevious();
    getCurrent(city);
  });
});

// function saveCitySearch ()

startPoint();

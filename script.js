//access local storage
function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    $(`#text${key}`).text(value);
  }
}

//declaring HTML variables
const todaysDate = moment().format("M-DD-YYYY");




//function to create city search list
function generateCityList (citySearch){
  //clear contents of searchList UL
  $("#searchList").empty();

  const keys = Object.keys(citySearch);
  for (let i = 0; i < keys.length; i++) {
   
    //create a new button for each city searched 
    const searchEntry = $("<button>");
    searchEntry.addClass("list-group-item list-group-item-action")

    // const city = $("#cityInput").val();
    //append name of city searched to button in list
    searchEntry.text(city);
    //append searched city to list
    $("#searchList").append(searchEntry);
    
  }
}

function generateCityWeather (city, citySearch) {

  
  //adding current date to header of today's forecast
  $("#currentDate").text(" (" + todaysDate + ")");
  
  //event function to trigger the AJAX call for city that user searches
  $("#findCity").on("click", function(event){
    event.preventDefault();
    //collecting the text from the input box
    const city = $("#cityInput").val();
    const lat;
    const long;
    
    const apiKey = "858f8ba5cfd6fd435f1cd0d521850b4d"
    //url for the AJAX call query including user input and API key
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",&appid=" + apiKey;
    
    
    //running AJAX call to OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      //console logging queryURL
      // console.log(queryURL);
      //console logging resulting object
      console.log(response);
      //console logging lattitude for searched city
      console.log(response.coord.lat);
      //console logging longitude for searched city
      console.log(response.coord.lon);
      
      
      
    })
    
    
    
  })
  
  
  
}

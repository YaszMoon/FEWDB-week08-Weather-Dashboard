// Search
// When search button clicked
// Input added to button and prepended to area below button
$("#search-button").on("click", function (event) {
  event.preventDefault();
  var newButton = $('<button type="button" class="cityButton">');
  var searchInput = $("#search-input").val();
  newButton.attr("data-city", searchInput);
  newButton.text(searchInput);

  $("#history").prepend(newButton);
});

// Add code for saving history to local storage

// When city button clicked
// Open weather api searched
// Reulsts appended to current weather and forecast sections
$(".list-group").on("click", "button.cityButton", function () {
  console.log("here");

  var city = $(this).attr("data-city");
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=5fecb9a931136489a4d6d7443df317a7";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    var todayDate = moment().format("D MMM YYYY");
    var todayCity = $("<h2 class='mt-1 h3'>");
    todayCity.text(city + " " + todayDate);
    // Add icon to the above
    
    var currentTemp = $("<p>");
    var conversion = response.main.temp - 273.15
    conversion = conversion.toFixed(2)
    currentTemp.text('Temperature: ' + conversion + ' °C')

    var currentWind = $("<p>");
    currentWind.text('Wind: ' + response.wind.speed + 'KpH')

    var currentHumidity = $("<p>");
    currentHumidity.text('Humidity: ' + response.main.humidity + '%')

    $('#today').empty()
    $("#today").append(todayCity, currentTemp, currentWind, currentHumidity);

    
  });
});

// 5-day Forecast
// Some kind of array to loop through?
// Date
// i Icon
// p temp
// p wind
// p humidity

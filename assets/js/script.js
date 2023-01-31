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

  $('#today').empty()
  $('#forecast').empty()

  var city = $(this).attr("data-city");
  var apiKey = "5fecb9a931136489a4d6d7443df317a7";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (responseC) {
    console.log(responseC);

    var todayDate = moment().format("D MMM YYYY");
    var todayCity = $("<h2 class='mt-1 h3'>");
    todayCity.text(city + " " + todayDate);
    // Add icon to the above

    var currentTemp = $("<p>");
    var currentTempConv = responseC.main.temp - 273.15;
    currentTempConv = currentTempConv.toFixed(2);
    currentTemp.text("Temperature: " + currentTempConv + " °C");

    var currentWind = $("<p>");
    currentWind.text("Wind: " + responseC.wind.speed + "KpH");

    var currentHumidity = $("<p>");
    currentHumidity.text("Humidity: " + responseC.main.humidity + "%");

    $("#today").append(todayCity, currentTemp, currentWind, currentHumidity);

    var latitude = responseC.coord.lat;
    var longitude = responseC.coord.lon;
    var queryURLForecast =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey;

    $.ajax({
      url: queryURLForecast,
      method: "GET",
    }).then(function (responseF) {
      
        $('#forecast').append('<h3>5-day Forecast:</h3>')

      var result = responseF.list;

      for (var i = 3; i <= 40; i = i + 8) {
        console.log(i);

        var forecastBlock = $('<div class="forecastBlock">');

        var forecastDate = $("<p>");
        var forecastDateConv = moment(
          result[i].dt_txt,
          "YYYY-MM-D HH:mm:ss"
        ).format("D/MM/YYYY");
        forecastDate.text(forecastDateConv);

        var forecastTemp = $("<p>");
        var forecastTempConv = result[i].main.temp - 273.15;
        forecastTempConv = forecastTempConv.toFixed(2);
        forecastTemp.text("Temp: " + forecastTempConv + " °C");

        var forecastWind = $("<p>");
        forecastWind.text("Wind: " + result[i].wind.speed + "KpH");

        var forecastHumidity = $("<p>");
        forecastHumidity.text("Humidity: " + result[i].main.humidity + "%");

        forecastBlock.append(
          forecastDate,
          forecastTemp,
          forecastWind,
          forecastHumidity
        );

        console.log(forecastBlock);
        $("#forecast").append(forecastBlock);
      }
    });
  });
});

// 5-day Forecast
// Some kind of array to loop through?
// Date
// i Icon
// p temp
// p wind
// p humidity

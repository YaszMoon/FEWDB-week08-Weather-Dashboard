// Function to create city buttons

function searchHistory(city) {
  var Button = $('<button type="button" class="cityButton">');
  Button.attr("data-city", city);
  Button.text(city);
  return Button;
}

// Search
// When search button clicked
// Input added to button and prepended to area below button
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // Grab city name
  var searchInput = $("#search-input").val();
  // Make new button
  var newButton = searchHistory(searchInput);
  // Add to history
  $("#history").prepend(newButton);
});

// TODO: Add code for saving history to local storage

// When city button clicked
// Open weather api searched
// Reulsts appended to current weather and forecast sections
$(".list-group").on("click", "button.cityButton", function () {
  console.log("here");

  //   Clear all weather results displayed before displaying new request
  $("#today").empty();
  $("#forecast").empty();

  //   Set-up to query current weather information
  var city = $(this).attr("data-city");
  var apiKey = "5fecb9a931136489a4d6d7443df317a7";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  // API query for current weather
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (responseC) {
    // Check response coming back in console
    console.log(responseC);

    // Info for current date and cuty queried
    var todayDate = moment().format("D MMM YYYY");
    var todayCity = $("<h2 class='mt-1 h3'>");
    todayCity.text(city + " " + todayDate + " ");
    // Current weather icon
    var currentIconURL =
      "https://openweathermap.org/img/wn/" + responseC.weather[0].icon + ".png";
    var currentIcon = $("<img>");
    currentIcon.attr("src", currentIconURL);
    todayCity.append(currentIcon);

    // Info for current temperature
    var currentTemp = $("<p>");
    var currentTempConv = responseC.main.temp - 273.15;
    currentTempConv = currentTempConv.toFixed(2);
    currentTemp.text("Temperature: " + currentTempConv + " °C");

    // Info for current wind speed
    var currentWind = $("<p>");
    currentWind.text("Wind: " + responseC.wind.speed + "KpH");

    // Info for current humidity
    var currentHumidity = $("<p>");
    currentHumidity.text("Humidity: " + responseC.main.humidity + "%");

    // Append all info to #today section of page
    $("#today").append(todayCity, currentTemp, currentWind, currentHumidity);

    // Set-up to query forecasted weather information
    // Get latitude and longitude for querying forecast
    var latitude = responseC.coord.lat;
    var longitude = responseC.coord.lon;

    var queryURLForecast =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey;

    //   API query for forecasted weather
    $.ajax({
      url: queryURLForecast,
      method: "GET",
    }).then(function (responseF) {
      $("#forecast").append("<h3>5-day Forecast:</h3>");

      //   Check response coming back in console
      console.log(responseF);

      // Have to repeat this a few times so var
      var result = responseF.list;

      // Forecast shown for 3 -hour blocks for 5 days
      // Loop through in intervals of 8 beginning from 3
      // Gives weather at 12 (midday) each day
      for (var i = 3; i <= 40; i = i + 8) {
        // Create block to house information
        var forecastBlock = $('<div class="forecastBlock">');

        // Info for forecast date
        var forecastDate = $("<p>");
        var forecastDateConv = moment(
          result[i].dt_txt,
          "YYYY-MM-D HH:mm:ss"
        ).format("D/MM/YYYY");
        forecastDate.text(forecastDateConv);

        // Forecasted weather icon
        var forecastIconURL =
          "https://openweathermap.org/img/wn/" +
          result[i].weather[0].icon +
          ".png";
        var forecastIcon = $("<img>");
        forecastIcon.attr("src", forecastIconURL);

        // Info for forecasted temperature
        var forecastTemp = $("<p>");
        var forecastTempConv = result[i].main.temp - 273.15;
        forecastTempConv = forecastTempConv.toFixed(2);
        forecastTemp.text("Temp: " + forecastTempConv + " °C");

        // Info for forecasted wind speed
        var forecastWind = $("<p>");
        forecastWind.text("Wind: " + result[i].wind.speed + "KpH");

        // Info for forecasted humidty
        var forecastHumidity = $("<p>");
        forecastHumidity.text("Humidity: " + result[i].main.humidity + "%");

        // Add all pieces to block
        forecastBlock.append(
          forecastDate,
          forecastIcon,
          forecastTemp,
          forecastWind,
          forecastHumidity
        );

        // Add block to forecast section of page
        $("#forecast").append(forecastBlock);
      }
    });
  });
});

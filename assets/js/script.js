// Search
// When search button clicked
// Input added to button and prepended to area below button
$("#search-button").on("click", function (event) {
  event.preventDefault();
  var newButton = $('<button type="button" class="cityButton">');
  var searchInput = $("#search-input").val();
  newButton.attr('data-city', searchInput)
  newButton.text(searchInput);

  $("#history").prepend(newButton);
});

// Add code for saving history to local storage

// When city button clicked
// Open weather api searched
// Reulsts appended to current weather and forecast sections
$(".list-group").on("click", 'button.cityButton', function() {
    console.log("here")

    var city = $(this).attr('data-city');
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5fecb9a931136489a4d6d7443df317a7"

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(response)
        })
})
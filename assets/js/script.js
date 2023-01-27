// Search
// When search button clicked
// Input added to button and prepended to area below button
$("#search-button").on("click", function (event) {
  event.preventDefault();
  var newButton = $('<button type="button">');
  var searchInput = $("#search-input").val();
  newButton.text(searchInput);

  $("#history").prepend(newButton);
});

// Add code for saving history to local storage

// When city button clicked
// Open weather api searched
// Reulsts appended to current weather and forecast sections

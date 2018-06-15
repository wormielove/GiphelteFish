$(document).on("click", ".food-btn", displayJewishFood);
$(document).on("click", ".gifImage", toggleAnimation);
$(document).ready(renderPage)

var jewishFood = ["gefelte fish", "matza", "kosher hot dogs"];

console.log(jewishFood);

function renderPage() {
  $("#submit").on("click", addButton);
  renderButtons();
}

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < jewishFood.length; i++) {
    var button = $("<button>");
    button.addClass("food-btn");
    button.attr("data-name", jewishFood[i]);
    button.text(jewishFood[i]);
    $("#buttons-view").append(button);

    console.log(button);
  }
}

function addButton() {
  // This line grabs the input from the textbox
  var userInput = $("#userInput").val().trim();

  // Adding movie from the textbox to our array
  jewishFood.push(userInput);

  console.log(userInput);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
}
function displayJewishFood() {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=23sA1wBLLwsHZihCyQoVIbEL079Bukrp&q=" + $(this).attr("data-name") + "&limit=10&offset=0&rating=PG-13&lang=en"

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      console.log(response);
      var results = response.data;
      $("#gifs-appear-here").empty();

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='gif'>");
        var imgURL = response.data[i].images.fixed_height_still.url;
        var image = $("<img class='gifImage'>").attr("src", imgURL);
        image.attr("data-state", "still");
        image.attr("data-animate", response.data[i].images.fixed_height.url);
        image.attr("data-still", imgURL);

        gifDiv.append(image);
        $("#gifs-appear-here").append(gifDiv);
        var rating = response.Rated;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        gifDiv.append(pOne);
      }
    });
  }

  function toggleAnimation() { 
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

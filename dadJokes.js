console.log("Hello!");
//1. User goes on my page and sees a dad picture with floating block on right side
//2. they click on img and it tells one random joke with a giggle
//3. User can also search for jokes.
//First one will appear and user will have option to see more jokes on the list
//4. There will be a button that user can click to see memes instead of just jokes

const $result = $("#jokeText");
const audio = new Audio("./sounds/peter-griffen-laugh.mp3");
const $jokesContainer = $("#jokes-container");
let jokes = [];
const jokesPerPage = 2;

//create a click event so when dad image is clicked, a random joke appears
$("#dadImage").on("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    audio.play();
  }, 2000);

  randomJoke();
});

//create another click for the search button to return jokes with that word
$("#searchBtn").on("click", (event) => {
  event.preventDefault();
  const searchWord = $("#searchInput").val();
  if (searchWord.length > 0) {
    searchJokes(searchWord);
  } else {
    $("#enterSearch").text("Please enter a search term");
  }
});

//create a keyboard event listener for the input when user presses enter
$("#searchInput").on("keypress", (event) => {
  const searchWord = $("#searchInput").val();
  if (event.key === "Enter" && searchWord.length > 0) {
    event.preventDefault();
    console.log("pushed enter");
    searchJokes(searchWord);
  } else {
    $("#enterSearch").text("Please enter a search term");
  }
});
//create a event listener to scroll down when clicked
$("#scrollDownBtn").on("click", () => {
  $("html, body").animate(
    {
      scrollTop: $jokesContainer.offset().top,
    },
    300
  );
});
//once page is ready, callback will run
$(document).ready(() => {
  $("#scrollDownBtn").on("click", function () {
    // Scroll to the jokes container
    $("html, body").animate(
      {
        scrollTop: $jokesContainer.offset().top,
      },
      300
    ); //speed
  });
  $("#scrollDownBtn").hide();
});

// Function to display jokes in containers
const displayJokes = (newJokes) => {
  if (newJokes && newJokes.length > 0) {
    //loop through each joke and create a card
    newJokes.forEach((jokeData, index) => {
      const $card = $("<div></div>")
        .addClass("card text-white bg-primary mb-3")
        .css({
          "max-width": "40rem", // maximum width to 40rem
        });

      const $cardHeader = $("<div></div>")
        .addClass("card-header")
        .css({
          "font-size": "2rem",
          "background-color": "blue", //background color of header is blue
        })
        .text(`Joke ${index + 1}`);

      const $cardBody = $("<div></div>").addClass("card-body");
      const $blockQuote = $("<blockquote></blockquote>")
        .addClass("blockquote mb-0")
        .css({
          "background-color": "white",
          color: "black",
        });

      const $quoteText = $("<p></p>").text(jokeData.joke).css({
        color: "black",
      });

      const $footer = $("<footer></footer>")
        .addClass("block-footer").css({
          color: "black",
        });

      //append all of it together and then to the card
      $blockQuote.append($quoteText, $footer);
      $cardBody.append($blockQuote);
      $card.append($cardHeader, $cardBody);
      $jokesContainer.append($card);
    });
    const totalJokes = jokes.length + newJokes.length;
    if (totalJokes > jokesPerPage) {
      // If total jokes exceed the page limit, show the "Show More Jokes" button
      $("#scrollDownBtn").show("bounce");
    } else {
      $("#scrollDownBtn").hide();
    }
  } else {
    $result.text("No Jokes Found");
    // $("#scrollDownBtn").hide(); // hide button if no jokes to display
  }
};

// create a seperate function to return the random joke using $.ajax call
const randomJoke = () => {
  const url = `https://icanhazdadjoke.com/`;
  $result.empty();
  //use $.ajax call to get random jokes from API
  $.ajax({
    method: "GET",
    url: url,
    headers: {
      Accept: "application/json",
    },
    success: (data) => {
      $result.text(data);
      console.log(data);
    },
    error: (err) => {
      console.error("Error getting joke", err);
    },
  });
};
// create a seperate function to search for jokes using $.ajax call
const searchJokes = (searchTerm) => {
  const url = `https://icanhazdadjoke.com/search?term=${searchTerm}`;
  const jokesContainer = $("#jokes-container");

  $.ajax({
    method: "GET",
    url: url,
    headers: {
      Accept: "application/JSON",
    },
    success: (data) => {
      console.log(data.results);

      //if there are jokes found, show the joke and then play audio
      if (data.results && data.results.length > 0) {
        const jokesData = data.results.map((joke) => ({ joke: joke.joke })); // Structure all jokes

        displayJokes(jokesData); // Display all jokes
        const firstJoke = data.results[0]; // Get the first joke
        $result.text(firstJoke.joke); // Display the first joke in the joke box
        setTimeout(() => {
          audio.play();
        }, 3000);
      }
      //if not, return no jokes found & hide the show more button
      else {
        $result.text("No Jokes Found");
        $("#scrollDownBtn").hide();
      }
    },
    error: (err) => {
      console.error("Error getting joke", err);
    },
  });
};
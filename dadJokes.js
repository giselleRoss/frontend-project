console.log("Hello!");
//1. User goes on my page and sees a dad picture with floating block on right side
//2. they click on img and it tells one random joke with a giggle
//3. User can also search for jokes.
//First one will appear and user will have option to see more jokes on the list
//4. There will be a button that user can click to see memes instead of just jokes

const $result = $("#jokeText");
const audio = new Audio("./sounds/peter-griffen-laugh.mp3");
const $jokesContainer = $("#jokes-container");
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
const displayJokes = (jokes) => {
  $jokesContainer.empty();
  if (jokes.length > 0) {
    //loop through each joke and create a card
    jokes.forEach((jokeData, index) => {
      const $card = $("<div></div>").addClass("card");
      //create divs for a header and body
      const $cardHeader = $("<div></div>")
        .addClass("card-header")
        .text(`Joke ${index + 1}`);
      const $cardBody = $("<div></div>").addClass("card-body");
      //create a blockquote for the joke
      const $blockQuote = $("<blockquote></blockquote>").addClass(
        "blockquote mb-0"
      );
      //add & change the text for p element
      const $quoteText = $("<p></p>").text(jokeData.joke);
      //add a footer to the card to add like an author
      const $footer = $("<footer></footer>")
        .addClass("block-footer")
        .text(`Someone famous`);

      $blockQuote.append($quoteText, $footer);
      $cardBody.append($blockQuote);
      $card.append($cardHeader, $cardBody);
      $jokesContainer.append($card);
    });

    if (jokes.length > jokesPerPage) {
      // Show the "Show More Jokes" button if more than the predefined limit
      $("#scrollDownBtn").show("bounce");
    } else {
      $("#scrollDownBtn").hide(); // Hide button if no more jokes to display
    }
  } else {
    $result.text("No Jokes Found");
    $("#scrollDownBtn").hide(); // Hide button if no jokes to display
  }
};

//create a event listener to scroll down when clicked
$("#scrollDownBtn").on("click", () => {
  $("html, body").animate(
    {
      scrollTop: $jokesContainer.offset().top,
    },
    300
  );
});
// $(".seeMoreBtn").on("click", (event) => {
//   event.preventDefault();

// });
// create a seperate function to return the random joke using $.ajax call
const randomJoke = () => {
  const url = `https://icanhazdadjoke.com/`;
  $result.empty();
  //use $.ajax call to get random jokes from API
  $.ajax({
    method: "GET",
    url: url,
    headers: {
      Accept: "text/plain",
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
      if (data.results && data.results.length > 0) {
        displayJokes(data.results);
        setTimeout(() => {
          audio.play();
        }, 3000);
      } else {
        $result.text("No Jokes Found");
        $("#scrollDownBtn").hide();
      }
    },
    error: (err) => {
      console.error("Error getting joke", err);
    },
  });
};

// $tweetContainer = $(".tweets");
// $authorTweets = $('.user');

// let lastTweetIndex = 0;
// $authorTweets.empty();
//   $tweetContainer.empty();
//   const tweets = streams.users[userName]; // get array of tweet objects from user
//   for (let tweet of tweets){
//     console.log(tweet);
//     const $message = $(`<div><p>${tweet.message} at ${tweet.createdAt}</p><div>`);
//     $authorTweets.prepend($message);
//   }

//   $authorTweets.prepend(`<h4>Messages By ${userName} </h4>`);
// }

// $('.displayTweets').on('click', addTweets);

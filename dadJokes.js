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
const jokesPerPage = 1;

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
  if (searchWord.length === 0 || searchWord === null) {
    $("#enterSearch").text("Please enter a valid search term");
  } else {
    searchJokes(searchWord);
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
    $("#enterSearch").text("Please enter a valid search term");
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
// Function to display jokes in containers
const displayJokes = (newJokes) => {
  if (newJokes && newJokes.length > 0) {
    $jokesContainer.empty(); // Clear the container before displaying new jokes

    const displayJokeAtIndex = (jokeData, index) => {
      getRandName((randName) => {
        const $card = $("<div></div>")
          .addClass("card text-white bg-primary mb-3")
          .css({
            "max-width": "40rem", // maximum width to 40rem
          });

        const $cardBody = $("<div></div>").addClass("card-body");
        const $jokeItemContent = $("<div></div>").addClass("joke-item-content");

        const $avatarInfo = $("<div></div>").addClass("person-avatar-info small-avatar");
        const $avatar = $("<div></div>").addClass("avatar");
        const $avatarLink = $("<a></a>").attr("href", "#").attr("aria-label", "avatar link");
        const $avatarFigure = $("<div></div>").addClass("figure");
        const $logo = $('<img id="logo" src="images/click-n-smile-by-memoco-designcrowd.png"/>')
          .css({
            height: "50px",
            width: "60px",
          });

        $avatarFigure.prepend($logo);
        $avatarLink.append($avatarFigure);
        $avatar.append($avatarLink);

        const $info = $("<div></div>").addClass("info").css({
          "flex":"wrap",
          "flex-direction":"column",
          "padding": "36px"
        });
        const $name = $("<h4></h4>");
        const $nameLink = $("<a></a>")
          .attr("href", "javascript:void(0)")
          .text("DadJokes101")
          .css({
            "color": "white",
            "padding": "36px"
          });
        const $username = $("<small></small>").text("@" + randName);

        $info.append($avatar, $name.append($nameLink), $username);
        $avatarInfo.append($info);

        const $quoteText = $(`<p>""</p>`)
          .text(jokeData.joke)
          .css({
            color: "white",
            textAlign: "center", // Center the text within the blockquote
            margin: "5 auto", // Center the blockquote horizontally
            border: "5px solid #ccc", // Add a border to the quote text
            padding: "20px", // Center the blockquote horizontally
          });

        $jokeItemContent.append($avatarInfo, $quoteText);
        $cardBody.append($jokeItemContent);
        $card.append($cardBody);
        $jokesContainer.append($card);
      });
    };

    newJokes.forEach((jokeData, index) => {
      displayJokeAtIndex(jokeData, index);
    });

    const totalJokes = jokes.length + newJokes.length;
    if (totalJokes > jokesPerPage) {
      $("#scrollDownBtn").show("bounce");
    } else {
      $("#scrollDownBtn").hide();
    }
  } else {
    $result.text("No Jokes Found");
    $("#scrollDownBtn").hide();
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
  const $jokesContainer = $("#jokes-container");
  $jokesContainer.empty();

  $.ajax({
    method: "GET",
    url: url,
    headers: {
      Accept: "application/JSON",
    },
    success: (data) => {
      if (data.results && data.results.length > 0) {
        const jokesData = data.results.map((joke) => ({ joke: joke.joke }));
        displayJokes(jokesData);
        const firstJoke = data.results[0];
        $result.text(firstJoke.joke);
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
const getRandName = (callback) => {
  let url = "https://api.api-ninjas.com/v1/randomuser";
  let randName;
  $.ajax({
    method: "GET",
    url: url,
    headers: { "X-Api-Key": "kEctJ3kvu+9kMOnOJqTAQw==ohk9V7aU3ZrW8q5b" },
    contentType: "application/json",
    success: (result) => {
      console.log(randName);
      randName = result.name;
      callback(randName);
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
};
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
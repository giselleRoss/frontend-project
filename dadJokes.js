console.log("Hello!")
//1. User goes on my page and sees a dad picture with floating block on right side
//2. they click on img and it tells one random joke with a giggle
//3. User can also search for jokes. 
//First one will appear and user will have option to see more jokes on the list
//4. There will be a button that user can click to see memes instead of just jokes
const $result = $("#jokeText");
const audio = new Audio('./sounds/peter-griffen-laugh.mp3');
const $jokesContainer = $("joke-box");
//create a click event so when dad image is clicked, a random joke appears
$("#dadImage").on("click", (event) => {
  event.preventDefault();
  setTimeout(() => {
    audio.play();
  }, 2000)
  
  randomJoke();
});
//create another click for the search button to return jokes with that word
$("#searchBtn").on("click", (event) => {
  event.preventDefault();
  console.log("button clicked!")
  const searchWord = $("#searchInput").val();
  console.log(searchWord);
  if(searchWord.length > 0) {
    searchJokes(searchWord);
  setTimeout(() => {
      audio.play();
    }, 3000)
  }
  else {
    $result.text("Please enter a search term")
  }
  
});

//create a keyboard event listener for the input when user presses enter
$("#searchInput").on("keypress", (event) => {
  const searchWord = $("#searchInput").val();  
  if(event.key === "Enter" && searchWord.length > 0){
    event.preventDefault();
    console.log("pushed enter")
    searchJokes(searchWord);
  }
  else {
    $result.text("Please enter a search term")
  }
  
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
    "Accept": "text/plain"
  },
  success: (data) => {
    $result.text(data);
    console.log(data)
  },
  error: (err) => {
    console.error("Error getting joke", err);
  }
  })
}
// create a seperate function to search for jokes using $.ajax call
const searchJokes = (searchTerm) => {
  const url = `https://icanhazdadjoke.com/search?term=${searchTerm}`;
  const jokesContainer = $("#jokes-container");
  // $result.empty();

  $.ajax({
    method: "GET",
    url: url,
    headers: {
    "Accept": "application/JSON"
  },
  success: (data) => {
    console.log(data.results)
    if(data.results && data.results.length > 0) {
      jokesContainer.empty(); //clear prev content
      data.results.forEach((joke) => {
        const $card = $("<div></div>").addClass("joke-box");
        const $jokeText = $("<p></p>").text(joke.joke);
        $card.append($jokeText);
        jokesContainer.append($card);
        jokesContainer.removeClass("d-none");

      }) 
    }
    else {
      jokesContainer.text("No Jokes Found")
    }
  },
  error: (err) => {
    console.error("Error getting joke", err);
  }
  })
}



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
console.log("Hello!")
const $result = $("#jokeText");
//create a click event so when dad image is clicked, a random joke appears
$("#dadImage").on("click", (event) => {
  event.preventDefault();
  randomJoke();
});
//create another click for the search button to return jokes with that word
$("#searchBtn").on("click", (event) => {
  event.preventDefault();
  console.log("button clicked!")
  const searchWord = $("#searchInput").val();
  console.log(searchWord);
  searchJokes(searchWord);
});

//create a keyboard event listener for the input when user presses enter
$("#searchInput").on("keypress", (event) => {
  if(event.key === "Enter"){
    event.preventDefault();
    console.log("pushed enter")
    const searchWord = $("#searchInput").val();
    searchJokes(searchWord);
  }
  
});
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
      $result.empty(); //clear prev content
      data.results.forEach((joke) => {
        const $card = $("<div></div>").addClass("result-card");
        const $jokeText = $("<p></p>>").text(joke.joke);
        $card.append($jokeText);
        $result.append($card);

      }) 
    }
    else {
      $result.text("No Jokes Found")
    }
  },
  error: (err) => {
    console.error("Error getting joke", err);
  }
  })
}


// $(document).ready(() => {
//     // Function to fetch a joke based on the search term
//     $('#searchBtn').click(() => {
//       const searchTerm = $('#searchInput').val();
//       if (searchTerm.trim() !== '') {
//         fetchJoke(`https://icanhazdadjoke.com/search?term=${searchTerm}`);
//       } else {
//         alert('Please enter a search term');
//       }
//     });
  
//     // Function to fetch a random joke
  
//     function fetchJoke(url) {
//       $.ajax({
//         url: url,
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json'
//         },
//         success: (data) => {
//           if (data.results && data.results.length > 0) {
//             const randomIndex = Math.floor(Math.random() * data.results.length);
//             const randomJoke = data.results[randomIndex];
//             $('#jokeText').text(randomJoke.joke);
//           } else if (data.joke) {
//             $('#jokeText').text(data.joke);
//           } else {
//             $('#jokeText').text('No jokes found');
//           }
//           // Update image source here (fetch a dad image or display a default image)
//           // Example: $('#dadImage').attr('src', 'dad_image.png');
//         },
//         error: (err) => {
//           console.error("Error fetching joke:", err);
//         }
//       });
//     }
//   });
  
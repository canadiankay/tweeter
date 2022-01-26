/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape function that prevents cross-site scripting
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  // function that loops over existing tweets and adds them to the top of the tweets container
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const $newTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($newTweet);
    }
  };

// this function creates a new tweet
const createTweetElement = function(tweet) {
  const time = timeago.format(tweet.created_at);
  let $tweet = (`
  <article class="tweet">
    <div class="tweet-profile">
      <div class="user-tweeter">
        <img src='${tweet.user.avatars}'>
        <p>${tweet.user.name}</p>
      </div>
  
      <div class="ownerOfTweet">${tweet.user.handle}</div>
    </div>      

    <div class="tweetText">
    ${escape(tweet.content.text)}
    </div>    

    <footer class="tweetTime">
      <div>${time}</div>

      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>

  </article>`)
  return $tweet;
}

//AJAX call to fetch/load tweets
const loadTweets = function() {
  $.ajax({
    url: "http://localhost:8080/tweets", 
    method: "get", 
    success: (tweets) => {
      $(`#tweets-container`).empty()
      renderTweets(tweets)
    },
    error: (err) => console.log(`error: ${err}`)
  });
};
//loads initial tweets on refresh
loadTweets();


//event handler for submitting new tweets 
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    //we don't want an error box if we are submitting a tweet 
    $("#error").slideUp()


    /*The user should be given an error that their tweet content is too long or that it is not present
    (ideally separate messages for each scenario)
    The form should not be cleared
    The form should not submit*/ 
    let tweetLength = $('#tweet-text').val().length;

    //empty tweet
    if (tweetLength === 0) {
      $("#error").slideDown("slow");
      $("#error").html("You cannot submit an empty tweet. C'mon pour your heart out!");
      setTimeout(function() {
        $("#error").slideUp("fast", "linear");
      }, 3000);
      return;
    }
  

    // if tweet exceeds character limit
    if (tweetLength > 140) {
      $("#error").slideDown("slow");
      $("#error").html("Your tweet is too long! C'mon now, I know you can write more concisely.");
      setTimeout(function() {
        $("#error").slideUp("fast", "linear");
      }, 3000);
      return;
    }

    //submit tweet and reset counter if there are no errors
    const dataForm = $(this).serialize();

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: dataForm,
      success: function() {
        console.log("This was successful!")
      },
      error: (err) => console.log(`Error: ${err}!`)
    })

      .then(() => { loadTweets()
    //reset counter
    $(".counter").text(140);
    
    //empty out the text area once tweet is submitted
    $("#tweet-text").val("");
    })

  });

});

  









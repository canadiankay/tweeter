/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// this function creates a new tweet
const createTweetElement = function(tweet) {
  const time = timeago.format(tweet.created_at);
  let $tweet = (`
  <article class="tweet">
    <header class="tweet-profile">
      <div class="user-tweeter">
        <img src=${tweet.user.avatars}>
        <p>${tweet.user.handle}</p>
      </div>
  
      <div class="ownerOfTweet">${tweet.user.handle}</div>
    </header>      

    <div class="tweetText">
    ${tweet.content.text}
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
$(document).ready(function() {
  // function that loops over existing tweets and adds them to the top of the tweets container
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {

    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };
});

//event handler for submitting new tweets 
$(document).ready(function() {
  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    /*The user should be given an error that their tweet content is too long or that it is not present
    (ideally separate messages for each scenario)
    The form should not be cleared
    The form should not submit*/ 

    const tweetLength = $('#tweet-text').val().length;

    //empty tweet
    if (!tweetLength) {
      alert("This is a blank tweet!");
      return;
    }

    // if tweet exceeds character limit
    if (tweetLength > 140) {
      alert("This tweet exceeds the character limit!");
      return;
    }

    //submit tweet and reset counter if there are no errors
    const dataForm = $(this).serialize();
    $.post("/tweets", dataForm.then(), function(data) {
      loadTweets();

      //reset counter
      $(".counter").text(140);

      //empty out the text area once tweet is submitted
      $("#tweet-text").val("");

    });
 });
});

  

  //AJAX call to fetch/load tweets
  const loadTweets = function() {
    //const url = "http://localhost:8080/tweets";
    $.get("/tweets", function(data) {
      renderTweets(data.responseJSON);
    });
  };

  //loads initial tweets on refresh
  loadTweets();







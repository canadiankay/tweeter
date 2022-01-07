/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

  const renderTweets = function(tweets) {
  $(document).ready(function() {
    // loops through tweets
    for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  });
};

//ajax post request for event listener 
$(document).ready(function() {
  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    /*The user should be given an error that their tweet content is too long or that it is not present
    (ideally separate messages for each scenario)
    The form should not be cleared
    The form should not submit*/ 

    const tweetLength = $('#tweet-text').val().length;
    const maxChars = 140;

    //empty tweet
    if (tweetLength === 0) {
      alert("This is a blank tweet!");
      return;
    }

    // if tweet exceeds character limit
    if (tweetLength > maxChars) {
      alert("This tweet exceeds the character limit!");
      return;
    }

    //submit tweet
    if (tweetLength <= maxChars) {
    const url: "http://localhost:8080/tweets/";

    const dataForm = $(this).serialize();
    $.post(url, dataForm, function(data) {
      console.log(dataForm);
      loadTweets();
      });
    }
 });
});

  

  //load tweets AJAX get request
  const loadTweets = function() {
    const url = "http://localhost:8080/tweets";
    $.get(url, function(data) {
      renderTweets(data.responseJSON);
    });
  };

  loadTweets();







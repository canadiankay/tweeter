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




//TEST-- taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
  $(document).ready(function() {
    // loops through tweets
    for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
      $('#tweets-container').append(createTweetElement(tweet));
    }
  });
};

//ajax post request for event listener 
$(document).ready(function() {
  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    const dataForm = $(this).serialize();
    $.post("http://localhost:8080/tweets/", dataForm, function(data) {
      console.log(dataForm);
    });
  });
}); 




renderTweets(data);


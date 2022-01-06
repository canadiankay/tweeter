$(document).ready(function() {


  $('#tweet-text').on('input', function() {
    let numOfChars = $(this).val().length;
    let charsRemaining = 140 - numOfChars;
    let counter = $(this).closest('form').children('.button-box').children('.counter');
    
    counter.text(charsRemaining)


    //refers to tweet-text number of characters counter
    if (charsRemaining >= 0) {
      counter.removeClass('exceedLimit');
    }
    if (charsRemaining < 0) {
      counter.addClass('exceedLimit');
    }
  });
});
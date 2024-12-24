// Check to see if an element is visible on the screen
function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop;

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(function(){
  // Trigger certain animations to start
  $('body').addClass('dom-ready');

  // Add animation complete class to trigger fade in transition on the content when the branding animation is done
  $("#branding a").one('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd',function(){
    $('html').addClass('animation-complete');
  });

  // Check to see if we're on the index page and have to wait for the logo animation to finish
  if(!$('body').hasClass('index')) {

    // Check to see if the element is in view on page load
    if(isScrolledIntoView('#pathway')) {
      $('#pathway').addClass('is-visible');
    } else {
      $('#pathway').removeClass('is-visible');
    }

  // If on the home page, wait for the #main element's fade in transition to end before checking to see if the elemtn is visible
  } else {
    $('#main').bind('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd',function(){
      if(isScrolledIntoView('#pathway')) {
        $('#pathway').addClass('is-visible');
      } else {
        $('#pathway').removeClass('is-visible');
      }
    });
  }

  // Check to see if the element becomes visible as the user scrolls
  $(document).bind('scroll',function(){
    if(isScrolledIntoView('#pathway')) {
      $('#pathway').addClass('is-visible');
    } else {
      $('#pathway').removeClass('is-visible');
    }
  });
});

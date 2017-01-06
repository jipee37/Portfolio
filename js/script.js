$(document).ready(function() {
  var wWidth = window.innerWidth;
  var wHeight = window.innerHeight;
  $("nav.navbar-fixed-top").autoHidingNavbar();
  setMinHeight();

  $(window).on('resize', function() {
    if (wWidth !== window.innerWidth) {
      wWidth = window.innerWidth;
      setMinHeight();
    }
  });
});

function setMinHeight() {
  var wHeight=window.innerHeight;
  $('#about').css('min-height', wHeight);
  $('#portfolio').css('min-height', wHeight);
  $('#contact').css('min-height', wHeight);
}

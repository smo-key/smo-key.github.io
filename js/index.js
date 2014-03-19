$(document).ready(function () {
  updateContainer();
  $(window).resize(function() {
    updateContainer();
  });
});

function updateContainer() {
  var $cW = $(window).width();
  var $cH = $(window).height();
  $(".slidetext-center").css('height',$cH);
  $(".slidetext-center").css('width',$cW);
  $(".slidetext-static").css('width',$cW);
  $(".slidetext-top").css('height',$cH);
  $(".slidetext-top").css('width',$cW);
  //$(document).add(alert("Hello World 2!"));
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
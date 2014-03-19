$(document).ready(function () {
  updateContainer();
  $(window).resize(function() {
    updateContainer();
  });
});

function updateContainer() {
  //var $containerWidth = $(window).width();
  var $containerHeight = $(window).height();
  var $aloc = ($containerHeight - $("slide1-text").width())/2;
  $("slide1-text").css("top",$aloc);
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
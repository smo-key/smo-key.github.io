$(document).ready(function () {
  firstLoad();
  updateContainer();
  updateScroll();
  
  $(window).resize(function() {
    updateContainer();
  });
  
  $(window).scroll(function() {
     updateScroll();
  });
  
});

function firstLoad()
{
  $("#copyright").text('Copyright © ' + new Date().getFullYear().toString() + ' Arthur Pachachura');
}

function updateScroll() {
  var s = $(document).scrollTop();
  $(".header").css("background-color","rgba(242, 242, 242, " + (coerce(s*2,0,70)/100).toString() + ")");
  $("#heroslide").css("-webkit-filter","blur(" + (coerce((s - 25)*2.5,0,500)/100).toString() + "px)");
}

function updateContainer() {
//  var $cW = $(window).width();
//  var $cH = $(window).height();
}

function coerce(int, min, max) {
  if (int > max) { return max; }
  if (int < min) { return min; }
  return int;
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
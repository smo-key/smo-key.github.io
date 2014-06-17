$(document).ready(function () {
  firstLoad();
  updateScroll();
  
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
  $(".header").css("background-color","rgba(242, 242, 242, " + (coerce(s - 50,0,70)/100).toString() + ")");
  $("#heroslide").css("-webkit-filter","blur(" + (coerce((s - 40)*2.5,0,750)/100).toString() + "px)");
  if (s > $("#heroslide").innerHeight() + 16) {$("#headercontainer").removeClass("headerlesser").addClass("headergreater"); $("#headeravatar").addClass("headeravataractive"); $("#heropic").addClass("herozero"); $("#headeravatartext").addClass("headeravataractive"); }
  else {$("#headercontainer").removeClass("headergreater").addClass("headerlesser"); $("#headeravatar").removeClass("headeravataractive"); $("#heropic").removeClass("herozero"); $("#headeravatartext").removeClass("headeravataractive");}
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
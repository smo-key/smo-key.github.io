$(document).ready(function () {
  firstLoad();
  updateResize();
  updateScroll();
  smoothscroll();

  $(window).resize(function() {
    updateResize();
  });
  
  $(window).scroll(function() {
    updateScroll();
  });
  
});

function firstLoad()
{
  $("#copyright").text('Copyright © ' + new Date().getFullYear().toString() + ' Arthur Pachachura');
}

function updateResize() {
  
}

function smoothscroll() {
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target
      || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body')
        .animate({scrollTop: targetOffset}, 500);
       return false;
      }
    }
  });
}

function updateScroll() {
  var s = $(document).scrollTop();
  $(".header").css("background-color","rgba(242, 242, 242, " + (coerce(s - 50,0,70)/100).toString() + ")");
  $("#profile").css("-webkit-filter","blur(" + (coerce((s - 40)*2.5,0,750)/100).toString() + "px)");
  if (s > $("#profile").innerHeight() + 16) {$("#headercontainer").removeClass("headerlesser").addClass("headergreater"); $("#headeravatar").addClass("headeravataractive"); $("#heropic").addClass("herozero"); $("#headeravatartext").addClass("headeravataractive"); }
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

